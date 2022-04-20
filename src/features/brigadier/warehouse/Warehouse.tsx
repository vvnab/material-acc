import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRequest } from "./actions";
import { loadRequest as loadMaterialsRequest } from "features/directories/materials/actions";
import { loadRequest as loadWarehousesRequest } from "features/directories/warehouses/actions";
import { loadRequest as loadBrigadesRequest } from "features/directories/brigades/actions";
import { loadRequest as loadFlowsRequest } from "features/admin/stock/flows/actions";
import { selectList as selectFlows } from "features/admin/stock/flows/selectors";
import { selectBrigade, selectLoading } from "./selectors";
import { Loader } from "common/components";
import FlowItem from "./Item";

import styles from "./Warehouse.module.scss";

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Warehouse: React.FC<Props> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const brigade = useSelector(selectBrigade);
  const loading = useSelector(selectLoading);
  const flows = useSelector(selectFlows);
  useEffect(() => {
    dispatch(loadRequest());
    dispatch(loadMaterialsRequest());
    dispatch(loadWarehousesRequest());
    dispatch(loadBrigadesRequest());
    dispatch(loadFlowsRequest({ loadAll: true }));
  }, [dispatch]);
  return (
    <div {...rest} className={styles.wrap}>
      {loading ? (
        <Loader className={styles.loader} />
      ) : (
        <>
          <table className={styles.materials}>
            <tbody>
              {brigade?.materials?.map(
                ({ quantity, material: { id, title } }) => (
                  <tr key={id}>
                    <td>{title}</td>
                    <td>{quantity}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className={styles.flows}>
            {flows && flows.map((flow) => <FlowItem {...flow} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default Warehouse;
