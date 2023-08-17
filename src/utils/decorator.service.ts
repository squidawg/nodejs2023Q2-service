import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse, ApiUnauthorizedResponse
} from "@nestjs/swagger";

export function ApiGet(entity: any) {
  return applyDecorators(
    ApiOperation({ summary: 'Get all records' }),
    ApiOkResponse({
      description: 'Get all records',
      type: [entity],
    }),
  );
}
export function ApiGetById(entity: any) {
  return applyDecorators(
    ApiOperation({ summary: 'Get record by Id' }),
    ApiOkResponse({
      description: 'Get record',
      type: entity,
    }),
    ApiErrorResponses(),
  );
}

export class ErrorResponse {
  @ApiProperty({ example: '4xx' })
  statusCode: number;
  @ApiProperty({ example: 'timestamp' })
  timestamp: Date;
  @ApiProperty({ example: 'reason' })
  message: string;
}

export function ApiPost(entity?: any) {
  return applyDecorators(
    ApiOperation({ summary: 'Add record' }),
    ApiCreatedResponse({ description: 'Record created', type: entity }),
    ApiBadRequestResponse({
      description: 'Request body does not contain required fields',
      type: ErrorResponse,
    }),
  );
}
export function ApiLoginPost(entity?: any) {
  return applyDecorators(
    ApiOperation({ summary: 'Logging in User' }),
    ApiOkResponse({ description: 'Login successful', type: entity }),
    ApiBadRequestResponse({
      description: 'Request body does not contain required fields',
      type: ErrorResponse,
    }),
    ApiForbiddenResponse({
      description:
        "no user with such login or password doesn't match actual one",
      type: ErrorResponse,
    }),
  );
}
export function ApiRefreshAuth(entity: any) {
  return applyDecorators(
    ApiOperation({ summary: 'Refresh JWT Token' }),
    ApiOkResponse({ description: 'Refresh successful', type: entity }),
    ApiUnauthorizedResponse({
      description: 'Request body does not contain required fields',
      type: ErrorResponse,
    }),
    ApiForbiddenResponse({
      description: 'Refresh token is invalid or expired',
      type: ErrorResponse,
    }),
  );
}

export function ApiPut(entity: any) {
  return applyDecorators(
    ApiOperation({ summary: 'Update record' }),
    ApiOkResponse({
      description: 'Record updated',
      type: entity,
    }),
    ApiErrorResponses(),
  );
}

export function ApiDelete() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete record' }),
    ApiResponse({
      status: 204,
      description: 'Record deleted, no return content',
    }),
    ApiErrorResponses(),
  );
}

export function ApiErrorResponses() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Id is invalid (not uuid)',
      type: ErrorResponse,
    }),
    ApiNotFoundResponse({
      description: "Record with id doesn't exist",
      type: ErrorResponse,
    }),
  );
}



export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
