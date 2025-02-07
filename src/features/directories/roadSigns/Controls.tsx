import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilter } from "./selectors";
import { updateFilter } from "./actions";
import { showModal } from "features/modal";
import { Button, Input } from "common/components";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus as addIcon,
  faEraser as eraseIcon,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Controls.module.scss";
import { IRoadSign } from "./types";

const nullItem: IRoadSign = {
  title: "",
  pmToSqm: 0,
};

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Controls: React.FC<Props> = ({ ...rest }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const setFilter = (value: string) => dispatch(updateFilter(value));

  return (
    <div {...rest} className={styles.wrap}>
      <div className={styles.inputWrap}>
        <Input
          placeholder="Строка для поиска"
          className={styles.input}
          value={filter}
          onChange={(e) => setFilter(e.currentTarget.value)}
        />
        <FontAwesomeIcon
          icon={eraseIcon}
          className={[styles.eraseIcon, filter ? styles.active : ""].join(" ")}
          onClick={() => setFilter("")}
        />
      </div>
      <Button
        className={styles.addButton}
        onClick={() => dispatch(showModal(<Form {...nullItem} />))}
      >
        <FontAwesomeIcon icon={addIcon} className={styles.addIcon} />
      </Button>
    </div>
  );
};

export default Controls;
