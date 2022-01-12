import {Controller, Get, Post} from '@nestjs/common';
import {TrackService} from "./track.service";

@Controller('tracks')
export class TrackController {
    constructor(private readonly trackService: TrackService) {
    }

    @Get()
    index() {
        return this.trackService.getAll()
    }

    @Post()
    create() {
        return this.trackService.create()
    }

    @Get('/:id')
    show() {
        return this.trackService.getOne()
    }

    @Post('/delete/:id')
    delete() {
        return this.trackService.delete()
    }
}
