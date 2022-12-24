import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import * as mongoose from 'mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant-dto';
@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  // getall restaurants
  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantModel.find();
    return restaurants;
  }
  // create
  async create(restaurant): Promise<Restaurant> {
    const res = await this.restaurantModel.create(restaurant);
    return res;
  }
  // get restaurant by id
  async getById(id: string): Promise<Restaurant> {
    const res = await this.restaurantModel.findById(id);
    if (!res) {
      throw new NotFoundException('Restaurant not found');
    }
    return res;
  }
  // update restaurant
  async updateById(
    id: string,
    restaurant: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }
  // Delete a restaurant by ID  =>  DELETE  /restaurants/:id
  async deleteById(id: string): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndDelete(id);
  }
}
