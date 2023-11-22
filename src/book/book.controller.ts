import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';

@Controller('occupancy')
@ApiTags('occupancy') // Tag for Swagger
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('highlights')
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.' })
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.getOccupancyOverview();
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a user' })
  @ApiResponse({ status: 200, description: 'User signed up successfully.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        did: {
          type: 'string',
          description: 'User DID',
          example: 'bafybmif4izjee5vzslmn6g32o4vifdolkr5wy2c3bn2yywn3j6cezljjjq',
        },
        password: {
          type: 'string',
          description: 'User password',
          example: 'password123',
        },
      },
    },
  })
  async signUpUser(
    @Body('did') did: string,
    @Body('password') password: string,
  ): Promise<void> {
    return this.bookService.signUpUser(did, password);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({ status: 200, description: 'User signed in successfully.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        did: {
          type: 'string',
          description: 'User DID',
          example: 'bafybmif4izjee5vzslmn6g32o4vifdolkr5wy2c3bn2yywn3j6cezljjjq',
        },
        password: {
          type: 'string',
          description: 'User password',
          example: 'password123',
        },
      },
    },
  })
  async signInUser(
    @Body('did') did: string,
    @Body('password') password: string,
  ): Promise<string> {
    return this.bookService.loginUser(did, password);
  }



  @Post('update-lock-status/:did')
  @ApiOperation({ summary: 'Update user lock status by DID' })
  @ApiResponse({ status: 200, description: 'User lock status updated successfully.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        lockStatus: {
          type: 'string',
          description: 'User lock status (yes or no)',
          example: 'yes',
        },
      },
    },
  })
  async updateLockStatus(
    @Param('did') did: string,
    @Body('lockStatus') lockStatus: string,
  ): Promise<void> {
    return this.bookService.updateLockStatus(did, lockStatus);
  }





  @Post('update-rewards-consent/:did')
  @ApiOperation({ summary: 'Update user rewards consent status by DID' })
  @ApiResponse({ status: 200, description: 'User rewards consent status updated successfully.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        rewardsConsentStatus: {
          type: 'string',
          description: 'User rewards consent status (yes or no)',
          example: 'yes',
        },
      },
    },
  })
  async updateRewardsConsentStatus(
    @Param('did') did: string,
    @Body('rewardsConsentStatus') rewardsConsentStatus: string,
  ): Promise<void> {
    return this.bookService.updateRewardsConsentStatus(did, rewardsConsentStatus);
  }

  @Get()
  @ApiOperation({ summary: 'Get the latest occupant count' })
  @ApiResponse({ status: 200, description: 'Return the latest occupant count.' })
  async getLatestOccupantCount(): Promise<any> {
    return this.bookService.getLatestOccupantCount();
  }

  // Other methods...

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({ status: 200, description: 'Return the book with the specified ID.' })
  async getBook(
    @Param('id') id: string,
  ): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({ status: 200, description: 'Return the deleted book.' })
  async deleteBook(
    @Param('id') id: string,
  ): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
