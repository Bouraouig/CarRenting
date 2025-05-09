import SpinnerIcon from "@rsuite/icons/legacy/Spinner";
import SearchIcon from "@rsuite/icons/Search";
import SettingHorizontalIcon from "@rsuite/icons/SettingHorizontal";
import React, { useState } from "react";
import { Button, Divider, IconButton } from "rsuite";
import styles from "./filter.module.scss";
import Responsive from "../../Responsive";

export default function Filter({
  advancedComponent,
  advancedData,
  advanced,
  search,
  loading,
  ...props
}) {
  const [advancedSearch, setadvancedSearch] = useState(false);
  // const [model, setmodel] = useState(second);

  return (
    <div
      className={styles.container}
      style={{
        border: "solid 1px rgb(226,238,224)",
      }}
    >
      <div>{props.children}</div>

      <div className="p-10">
        <Button appearance="ghost" onClick={() => search()}>
          {loading ? (
            <SpinnerIcon pulse style={{ fontSize: "2em" }} />
          ) : (
            <>
              <SearchIcon /> Recherche
            </>
          )}
        </Button>

        {advanced && (
          <IconButton
            icon={<SettingHorizontalIcon />}
            style={{ marginLeft: 10 }}
            onClick={() => setadvancedSearch(!advancedSearch)}
          />
        )}
      </div>
      {advancedSearch && <Divider>-</Divider>}
      {advancedSearch && advancedComponent}
    </div>
  );
}
