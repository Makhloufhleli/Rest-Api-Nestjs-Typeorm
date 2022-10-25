import { HttpStatus } from '@nestjs/common';

export class ResponseEntity {
  static OK(message: string, data?: any) {
    return {
      statusCode: HttpStatus.OK,
      message,
      data,
    };
  }
}
