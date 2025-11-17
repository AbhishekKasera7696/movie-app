import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  create(createMovieDto: CreateMovieDto) {
    const movie = new this.movieModel(createMovieDto);
    return movie.save();
  }

//   findAll() {
//     return this.movieModel.find().exec();
//   }

findAll(page = 1, limit = 6) {
  const skip = (page - 1) * limit;
  return this.movieModel.find().skip(skip).limit(limit).exec();
}


  findOne(id: string) {
    return this.movieModel.findById(id).exec();
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.movieModel.findByIdAndDelete(id).exec();
  }
}
