import flowsWatchers from './flows/sagas';
import warehousesWatchers from './warehouses/sagas';
import brigadesWatchers from './brigades/sagas';

const watchers = [...flowsWatchers, ...warehousesWatchers, ...brigadesWatchers];

export default watchers;
