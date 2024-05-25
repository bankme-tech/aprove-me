import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus, Param,
  Post, Put,
  Req,
  Res,
} from '@nestjs/common';
import { AssignorService } from './assignors.service';
import { AssignorDto } from './dto/create.assignor';
import { Response, Request } from 'express';
import * as helpers from '../shared/helpers';
import { PayableDto } from '../payable/dto/create-payable';

@Controller('integrations')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post('assignor')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() assignorDto: AssignorDto,
    @Res() res: Response,
    @Req() req: Request
  ): Promise<Response> {
    const { document, email, phone, name } = req.body

    if (helpers.isEmptyOrNull( document) ||
        helpers.isEmptyOrNull( email) ||
        helpers.isEmptyOrNull( phone) ||
        helpers.isEmptyOrNull( name)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid Request. Param is missing or empty.'
      });
    }

    try {
      const assignor = await this.assignorService.create(assignorDto)
      return res.status(HttpStatus.CREATED).json({
        data: [assignor],
        status: HttpStatus.CREATED,
        message: 'Successfully created'
      })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while creating the assignor'
      });
    }
  }

  @Get('assignor/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id,
    @Res() res: Response
  ): Promise<Response> {
    if (typeof id === 'undefined' || typeof id === null ) {
      return  res.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        status: HttpStatus.BAD_REQUEST,
        message: `Invalid Request. Param ${id} is invalid.`
      });
    }

    try {
      const assignor  = await this.assignorService.findOne(id);

      if (assignor === null) {
        return res.status(HttpStatus.NOT_FOUND).json({
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: 'Assignor not found'
        });
      }

      return  res.status(HttpStatus.OK).json({
        data: [assignor],
        status: HttpStatus.OK,
        message: `Successfully found`
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while creating the payable'
      });
    }
  }

  @Delete('assignor/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id, @Res() res: Response): Promise<Response> {

    if (typeof id === 'undefined' || typeof id === null ) {
      return  res.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        status: HttpStatus.BAD_REQUEST,
        message: `Invalid Request. Param ${id} is invalid.`
      });
    }

    const deletedAssignor = await this.assignorService.delete(id)
    return res.status(HttpStatus.NO_CONTENT).json({
      data: [deletedAssignor],
      status: HttpStatus.NO_CONTENT,
      message: 'Successfully deleted'
    })
  }

  @Put('assignor/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() assignorDto: AssignorDto,
    @Param('id') id,
    @Res() res: Response
  ): Promise<Response> {

    if (typeof id === 'undefined' || typeof id === null ) {
      return  res.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        status: HttpStatus.BAD_REQUEST,
        message: `Invalid Request. Param ${id} is invalid.`
      });
    }

    const assignor = await this.assignorService.update(id, assignorDto);
    return res.status(HttpStatus.OK).json({
      data: [assignor],
      status: HttpStatus.OK,
      message: 'Successfully updated'
    })

  }
}