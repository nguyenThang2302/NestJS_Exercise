import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import {
  ErrorHttpResponse,
  ValidHttpResponse,
} from '../packages/handler/response/validHttp.response';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
    const data = await this.productsService.createOne(createProductDto);
    return ValidHttpResponse.toCreatedResponse(
      'Created product successfully',
      data,
    );
  }

  @Get()
  async findAll() {
    try {
      const data = await this.productsService.findAll();
      return ValidHttpResponse.toOkResponse(
        'Get all products successfully',
        data,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productsService.findOne(id);

    if (data) {
      return ValidHttpResponse.toOkResponse(
        `Get product with id ${id} is successfully`,
        data,
      );
    }

    return ErrorHttpResponse.errorResponse(
      'GPID_0001',
      'System error',
      `Not found product with id ${id}`,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.findOne(id);

    if (product) {
      const data = await this.productsService.update(id, updateProductDto);
      return ValidHttpResponse.toOkResponse(
        `Update product with id ${id} is successfully`,
        data,
      );
    }

    return ErrorHttpResponse.errorResponse(
      'GPID_0001',
      'System error',
      `Not found product with id ${id}`,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);

    if (product) {
      const data = await this.productsService.delete(id);
      return ValidHttpResponse.toOkResponse(
        `Delete product with id ${id} is successfully`,
        data,
      );
    }

    return ErrorHttpResponse.errorResponse(
      'GPID_0001',
      'System error',
      `Not found product with id ${id}`,
    );
  }
}
