import {
  Controller,
  Body,
  Post,
  HttpStatus,
  Get,
  HttpCode,
  Res,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PayableDto } from './DTOs/payable';
import { AssignorDto } from './DTOs/assignor';
import { PayableRepo } from './repositories/payable-repo';
import { AssignorRepo } from './repositories/assignor-repo';
import { Response } from 'express';

@Controller('integrations')
export class AppController {
  constructor(
    private receivable: PayableRepo,
    private assignor: AssignorRepo,
  ) {}

  @Post('payable')
  async createReceivable(@Body() body: PayableDto, @Res() res: Response) {
    try {
      const newReceived = await this.receivable.createPayable(body);

      if (!newReceived) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Payable not created',
        });
      }

      return res.status(HttpStatus.CREATED).json(newReceived);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Get('payable/:id')
  @HttpCode(HttpStatus.OK)
  async getReceivables(@Param('id') id: string, @Res() res: Response) {
    try {
      const receivables = await this.receivable.getPayableById(id);

      if (!receivables) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Receivable not found',
        });
      }

      return res.status(HttpStatus.OK).json(receivables);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Get('payable')
  @HttpCode(HttpStatus.OK)
  async getReceivablesAll(@Res() res: Response) {
    try {
      const receivables = await this.receivable.getAllPayables();

      if (!receivables) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Receivables not found',
        });
      }

      return res.status(HttpStatus.OK).json(receivables);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Put('payable/:id')
  @HttpCode(HttpStatus.OK)
  async updatePayable(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() body: PayableDto,
  ) {
    try {
      const updated = await this.receivable.updatePayable(id, body);

      if (!updated) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Payable not found',
        });
      }

      return res.status(HttpStatus.OK).json(updated);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Delete('payable/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePayable(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.receivable.deletePayable(id);

      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Post('assignor')
  async createAssignor(@Body() body: AssignorDto, @Res() res: Response) {
    try {
      const newAssignor = await this.assignor.createAssignor(body);

      if (!newAssignor) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Assignor not created',
        });
      }

      return res.status(HttpStatus.CREATED).json(newAssignor);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Get('assignor/:id')
  @HttpCode(HttpStatus.OK)
  async getAssignors(@Param('id') id: string, @Res() res: Response) {
    try {
      const assignors = await this.assignor.getAssignorById(id);

      if (!assignors) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Assignor not found',
        });
      }

      return res.status(HttpStatus.OK).json(assignors);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Get('assignor')
  @HttpCode(HttpStatus.OK)
  async getAssignorsAll(@Res() res: Response) {
    try {
      const assignors = await this.assignor.getAllAssignors();

      if (!assignors) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Assignors not found',
        });
      }

      return res.status(HttpStatus.OK).json(assignors);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Put('assignor/:id')
  @HttpCode(HttpStatus.OK)
  async updateAssignor(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() body: AssignorDto,
  ) {
    try {
      const updated = await this.assignor.updateAssignor(id, body);

      if (!updated) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Assignor not found',
        });
      }

      return res.status(HttpStatus.OK).json(updated);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Delete('assignor/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAssignor(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.assignor.deleteAssignor(id);

      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }
}
