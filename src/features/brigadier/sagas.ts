import warehouseWatchers from './warehouse/sagas';
import reportsWatchers from './reports/sagas';

const watchers = [...warehouseWatchers, ...reportsWatchers];

export default watchers;
