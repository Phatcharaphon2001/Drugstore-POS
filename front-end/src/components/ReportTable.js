import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 65,
    rowHeight: 60,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)} //line between head and data
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

const sample = [
  [1, 'Product1', 'Drug', 20.00, 25.00, 4,'020822', 100.00],
  [2, 'Product2', 'Drug', 10.00, 12.00, 5,'060822', 60.00],
  [3, 'Product3', 'Drug', 15.00, 20.00, 7,'070822', 140.00],
  [4, 'Product4', 'Drug', 8.00, 10.00, 2,'070822', 20.00],
  [5, 'Product5', 'Drug', 33.00, 35.00, 2,'080822', 70.00],
  [6, 'Product6', 'Drug', 10.00, 15.00, 3,'060922', 45.00],
  [7, 'Product7', 'Candy', 2.00, 5.00, 2,'060822', 10.00],
  [8, 'Product8', 'Drink', 11.00, 13.00, 3,'060822', 39.00],
  [9, 'Product9', 'Drink', 11.00, 13.00, 3,'060822', 39.00],
  [10, 'Product10', 'A', 11.00, 13.00, 3,'060822', 39.00],
  [11, 'Product11', 'Demo', 11.00, 13.00, 3,'060822', 39.00],
  [12, 'Product12', 'Test', 11.00, 13.00, 3,'060822', 39.00],
  [13, 'Product13', 'milk', 11.00, 13.00, 3,'060822', 39.00],
];

function createData(id, productName, category, cost, selling, purchased, date, sale) {
  return { id, productName, category, cost, selling, purchased, date, sale };
}

const rows = [];

//แค่ตัวอย่างของจริงดึงข้อมูลจากดาต้ามา
rows.push(createData(...sample[0]));
rows.push(createData(...sample[1]));
rows.push(createData(...sample[2]));
rows.push(createData(...sample[3]));
rows.push(createData(...sample[4]));
rows.push(createData(...sample[5]));
rows.push(createData(...sample[6]));
rows.push(createData(...sample[7]));
rows.push(createData(...sample[8]));
rows.push(createData(...sample[9]));
rows.push(createData(...sample[10]));
rows.push(createData(...sample[11]));
rows.push(createData(...sample[12]));

// for (let i = 1; i < 200; i += 1) {
//   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//   rows.push(createData(i, ...randomSelection));
// }

export default function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 500, width: '100%' }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 120,
            label: 'ID',
            dataKey: 'id',
          },
          {
            width: 200,
            label: 'Product Name',
            dataKey: 'productName',
          },
          {
            width: 120,
            label: 'Category',
            dataKey: 'category',
            
          },
          {
            width: 110,
            label: 'Cost',
            dataKey: 'cost',
            numeric: true,
          },
          {
            width: 110,
            label: 'Selling',
            dataKey: 'selling',
            numeric: true,
          },
          {
            width: 130,
            label: 'Purchase',
            dataKey: 'purchased',
            numeric: true,
          },
          {
            width: 120,
            label: 'Date',
            dataKey: 'date',
            numeric: true,
          },
          {
            width: 110,
            label: 'Sale',
            dataKey: 'sale',
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}
