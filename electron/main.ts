import './global';
import { appDataService } from './modules/app-module/service';

import './modules/auto-updater';
import './modules/local-config/events';
import './modules/database/events';

appDataService.initEvents();

