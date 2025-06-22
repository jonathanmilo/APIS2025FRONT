import {api, our_api} from './index';

export const fetchAllCategories = () => our_api.get('/categories');