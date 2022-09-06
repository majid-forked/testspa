import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ConfigurationService {
    private readonly db_url;
    constructor(@Inject('CONFIGURATION_OPTIONS') private options) {
        this.db_url = options.db_url;
    }

   async getDBUrl(){
       const fetchUrl = await axios.get(this.db_url);
       console.log(fetchUrl.data)
    }
}
