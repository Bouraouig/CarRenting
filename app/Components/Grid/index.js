import React from "react";
// import history from "../../Helpers/history";
import "./grid.css";
import GridIcon from "@rsuite/icons/Grid";
import { Edit, More } from "@rsuite/icons";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
// import "./pagination.css";
import { Divider, Dropdown, IconButton, Popover, Whisper } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import Swal from "sweetalert2";
import VisibleIcon from "@rsuite/icons/Visible";
class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      rows: [],
      pageSize: this.props.itemsPerPage,
    };
  }

  handleEvent2 = (event, id) => {
    var d = this.state.rows;
    var order1 = d[d.findIndex((x) => x.id == this.state.index)].order;
    var order2 = d[d.findIndex((x) => x.id == id)].order;
    d[d.findIndex((x) => x.id == id)].order = order1;
    d[d.findIndex((x) => x.id == this.state.index)].order = order2;
    d.sort((a, b) => a.order - b.order);
    this.setState({ rows: d, style: false });
  };

  onChange = (current, pageSize) => {
    this.props.paginate(this.props.filter, current, pageSize);
  };
  componentDidMount() {}
  render() {
    let columns = this.props.columns;
    this.state.rows = this.props.rows;
    const props = this.props;
    let arLocale = {
      locale: this.state.locale,
    };
    return (
      <>
        <div
          id="custom-table-container"
          style={{
            minHeight: "280px",
            backgroundColor: "white",
            maxWidth: "100vw",
          }}
        >
          <table id="custom-table">
            <tbody>
              <tr className="top-table-row ">
                {columns &&
                  columns.map((item, index) => {
                    return (
                      <td key={index}>
                        <span className={item["class"]}>{item.name}</span>
                      </td>
                    );
                  })}
                {props.actionKey && (
                  <td style={{ textAlign: "right", paddingRight: "30px" }}>
                    Actions
                  </td>
                )}
              </tr>
              {columns &&
                this.state.rows &&
                this.state.rows.map((row, index) => {
                  return (
                    <tr
                      style={{
                        direction: this.props.rtl ? "rtl" : "",
                        cursor: "pointer",
                      }}
                      key={index}
                      className="hovred-tr  border-bottom body-table-row"
                    >
                      {this.props.draggable ? (
                        <div
                          style={
                            this.props.draggable
                              ? { display: "none" }
                              : { display: "" }
                          }
                        >
                          <div
                            style={
                              this.props.draggable == false
                                ? { display: "none" }
                                : { display: "" }
                            }
                            onDragOver={() => {
                              console.log(this.props.draggable);
                              console.log(row.id);
                              this.setState({ index: row.id });
                            }}
                            onDragEnd={(e) => {
                              this.handleEvent2(e, row.id);
                            }}
                          >
                            <span
                              style={{ cursor: "pointer" }}
                              draggable={true}
                            >
                              <GridIcon size="18px" />
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {columns.map((column, i) => {
                        return (
                          <td
                            style={{ direction: this.props.rtl ? "rtl" : "" }}
                            className={column["tdClass"]}
                            key={i}
                            onClick={() =>
                              column.click
                                ? column.click(row[column.value])
                                : column.deleteLocal
                                ? column.deleteLocal(index)
                                : column.editLocal
                                ? column.editLocal(index)
                                : ""
                            }
                          >
                            {column.value4
                              ? column.render(
                                  row[column.value],
                                  row[column.value2],
                                  row[column.value3],
                                  row[column.value4]
                                )
                              : column.value3
                              ? column.render(
                                  row[column.value],
                                  row[column.value2],
                                  row[column.value3]
                                )
                              : column.value2
                              ? column.render(
                                  row[column.value],
                                  row[column.value2]
                                )
                              : column.render(row[column.value])}
                          </td>
                        );
                      })}
                      {props.actionKey && (
                        <td style={{ textAlign: "right" }}>
                          {ActionCell({
                            dataKey: row[props.actionKey],
                            noAdvancedActions: props.noAdvancedActions,
                            editAction: props.editAction,
                            deleteAction: props.deleteAction,
                            addServeyAction: props.addServeyAction,
                            checkAction: props.checkAction,
                            actions: props.actions,
                            index: index,
                          })}
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default Grid;
const renderMenu = (
  { onClose, left, top, className },
  ref,
  events = [],
  dataKey,
  onselect
) => {
  const handleSelect = (eventKey) => {
    onClose();
    events[eventKey].action(dataKey);
  };
  const render2 = (a, b, ev) => {
    console.log(a, b);
    ev(a, b);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        {events.map((ev, i) => (
          <Dropdown.Item eventKey={i}>
            {ev.render
              ? ev.render2
                ? render2(ev.label, dataKey, ev.render2)
                : ev.render(ev.label)
              : ev.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Popover>
  );
};

const ActionCell = ({
  dataKey,
  noAdvancedActions,
  editAction,
  deleteAction,
  actions,
  addServeyAction,
  checkAction,
  index,
  ...props
}) => {
  function handleDelete() {
    Swal.fire({
      title: "Voulez-vous vraiment supprimer cet element ! ",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(93,120,255)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, Supprimer!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAction(dataKey);
      }
    });
  }
  return (
    <div>
      {addServeyAction && (
        <IconButton
          appearance="subtle"
          onClick={() => addServeyAction(dataKey)}
          icon={<ExpandOutlineIcon />}
          circle
        />
      )}
      <Divider vertical />
      {checkAction && (
        <IconButton
          appearance="subtle"
          onClick={() => checkAction(dataKey)}
          icon={<VisibleIcon />}
          circle
        />
      )}
      <Divider vertical />
      {editAction && (
        <IconButton
          appearance="subtle"
          onClick={() => editAction(dataKey)}
          icon={<Edit />}
          circle
        />
      )}
      <Divider vertical />
      {deleteAction && (
        <IconButton
          appearance="subtle"
          onClick={handleDelete}
          icon={<TrashIcon />}
          circle
        />
      )}
      {!noAdvancedActions && (
        <>
          <Divider vertical />
          <Whisper
            placement="autoVerticalEnd"
            trigger="click"
            speaker={(el, ref) => renderMenu(el, ref, actions, dataKey)}
          >
            <IconButton appearance="subtle" icon={<More />} circle />
          </Whisper>
        </>
      )}
    </div>
  );
};
