import './global';
import { appDataService } from './modules/app-module/service';

import './modules/auto-updater';
import './modules/config/events';

appDataService.initEvents();

