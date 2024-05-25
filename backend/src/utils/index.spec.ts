import { BadRequestException } from '@nestjs/common';
import { validateDto, hashPassword, comparePassword } from '.';
import { IsNotEmpty, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';

// Mock bcrypt functions
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true),
}));

class TestDto {
  @IsString()
  @IsNotEmpty()
  field: string;
}

describe('Utils', () => {
  describe('validateDto', () => {
    it('should validate a valid DTO successfully', async () => {
      const validDto = { field: 'valid' };
      const result = await validateDto(validDto, TestDto);
      expect(result).toEqual(validDto);
    });

    it('should throw BadRequestException for an invalid DTO', async () => {
      const invalidDto = { field: '' };

      await expect(validateDto(invalidDto, TestDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'password123';
      const hashedPassword = await hashPassword(password);
      expect(hashedPassword).toBe('hashed_password');
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });
  });

  describe('comparePassword', () => {
    it('should return true if passwords match', async () => {
      const password = 'password123';
      const hash = 'hashed_password';
      const result = await comparePassword(password, hash);
      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });

    it('should return false if passwords do not match', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);
      const password = 'password123';
      const hash = 'different_hashed_password';
      const result = await comparePassword(password, hash);
      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });
  });
});
