import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant-dto';
@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}
  // getAll
  @Get()
  async getAllRestaurants(
    @Query()
    query: ExpressQuery,
  ): Promise<Restaurant[]> {
    return this.restaurantsService.findAll(query);
  }
  // create
  @Post()
  async createRestaurant(
    @Body()
    restaurant: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(restaurant);
  }
  // get one
  @Get(':id')
  async getRestaurant(
    @Param('id')
    id: string,
  ): Promise<Restaurant> {
    return this.restaurantsService.getById(id);
  }
  // udpdate
  @Patch(':id')
  async updateRestaurant(
    @Param('id')
    id: string,
    @Body()
    restaurant: Restaurant,
  ): Promise<Restaurant> {
    return this.restaurantsService.updateById(id, restaurant);
  }
  // delete
  @Delete(':id')
  async deleteRestaurant(
    @Param('id')
    id: string,
  ): Promise<{ deleted: Boolean }> {
    await this.restaurantsService.getById(id);

    const restaurant = this.restaurantsService.deleteById(id);

    if (restaurant) {
      return {
        deleted: true,
      };
    }
  }
}
