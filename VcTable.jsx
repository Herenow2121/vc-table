import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import { Table } from 'react-bootstrap';

import VcTableHead from './VcTableHead';
import VcTableHeaderCell from './VcTableHeaderCell';
import VcTableBody from './VcTableBody';

/**
 * The VcTable component is responsible for rendering
 * arbitrary collections of data in a HTML table.
 *
 * ### Dependencies
 * - React
 * - React Bootstrap
 * - Moment.js
 *
 * ### Notes
 * - The `VcTable` and `VcTableColumnDefinition` components are the only public components.
 *
 * ### Examples
 *
 * - Basic Usage
 * ```JSX
 *  users = [{
 *    firstNm: 'first name',
 *    lastNm: 'last name',
 *    email: 'flast@mailinator.com'
 *  }];
 *
 *  <VcTable data={users}>
 *    <VcTableColumnDefinition sortField="firstNm">First Name</VcTableColumnDefinition>
 *    <VcTableColumnDefinition sortField="lastNm">Last Name</VcTableColumnDefinition>
 *    <VcTableColumnDefinition sortField="email">Email</VcTableColumnDefinition>
 *  </VcTable>
 * ```
 *
 * - Sort and Row Click Callbacks
 * ```JSX
 *
 * onTableSort(records) {
 *   //all sorted records
 * }
 *
 * onTableRowClick(record) {
 *   //record associated to selected row
 * }
 *
 * <VcTable data={testData} onSort={this.onTableSort} onRowClick={this.onTableRowClick}>
 *    <VcTableColumnDefinition sortField="firstNm">First Name</VcTableColumnDefinition>
 *    <VcTableColumnDefinition sortField="lastNm">Last Name</VcTableColumnDefinition>
 *    <VcTableColumnDefinition sortField="email">Email</VcTableColumnDefinition>
 *  </VcTable>
 * ```
 */
export default class VcTable extends Component {

  static propTypes = {
    /**
     * The data to be rendered as a table.
     *
     * - Expects a collection of object literals.
     * - Composed objects are allowed and can be deeply nested and referenced by `TableColumnDefinition`.
     */
    data: React.PropTypes.arrayOf(
        React.PropTypes.object
    ),

    /**
     * Restrict the data set to a specific range of records
     * by index using `dataMin` and `dataMax`.
     */
    dataMin: React.PropTypes.Number,

    /**
     * Restrict the data set to a specific range of records
     * by index using `dataMax` and `dataMin`.
     */
    dataMax: React.PropTypes.Number,

    /**
     * This callback is executed when VcTable sorts `data`.
     */
    onSort: React.PropTypes.func,

    /**
     * This callback is executed when a row is clicked.  The
     * associated row object will be passed as an argument.
     */
    onRowClick: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      tempRows: [],
      sortField: null,
      sortOrder: 'desc'
    };
  }

  componentDidMount() {
    this.setState({
      rows: this.props.data
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      rows: props.data,
      sortField: null,
      sortOrder: 'desc'
    });
  }

  addTempRow(row) {

    var tempRows = this.state.tempRows;
    tempRows.push(row);

    this.setState({
      tempRows: tempRows
    });
  }

  _deepGet(record, sort) {
    var s = sort.split('.');

    var obj = record[s.shift()];
    while (obj && s.length) {
      obj = obj[s.shift()];
    }

    return obj;
  }

  setSort(column, order) {

    var self = this,
        rows = this.state.rows;

    rows.sort(function(a, b) {
      if (order === 'desc') {
        if (self._deepGet(b, column) === null) {
          return false;
        }

        if (self._deepGet(a, column) === null) {
          return true;
        }

        if (typeof self._deepGet(b, column) === 'string') {
          return self._deepGet(b, column).localeCompare(self._deepGet(a, column));
        } else {
          return self._deepGet(a, column) > self._deepGet(b, column) ? -1 : ((self._deepGet(a, column) < self._deepGet(b, column)) ? 1 : 0);
        }
      } else {
        if (self._deepGet(b, column) === null) {
          return true;
        }

        if (self._deepGet(a, column) === null) {
          return false
        }

        if (typeof self._deepGet(a, column) === 'string') {
          return self._deepGet(a, column).localeCompare(self._deepGet(b, column));
        } else {
          return self._deepGet(a, column) < self._deepGet(b, column) ? -1 : ((self._deepGet(a, column) > self._deepGet(b, column)) ? 1 : 0);
        }
      }
    });

    this.setState({
      sortField: column,
      sortOrder: order
    });

    this.props.onSort(rows);
  }

  render() {

    var self = this;

    var rows = update(this.state.rows, {
      $push: this.state.tempRows
    });

    //add table cells w/ sorting callback
    var cells = [];
    this.props.children.forEach(function(child, index) {
      cells.push(
        <VcTableHeaderCell
          onSort={self.setSort.bind(self)}
          key={index}
          column={child}
          sortField={self.state.sortField}
          sortOrder={self.state.sortOrder}
        >{child.props.children}</VcTableHeaderCell>
      );
    });

    return (
      <Table bordered={false} condensed={true} hover={true} className="vc-table">
        <VcTableHead ref="thead">
          {cells}
        </VcTableHead>
        <VcTableBody ref="tbody"
                   data={rows}
                   dataMin={this.props.dataMin}
                   dataMax={this.props.dataMax}
                   columns={this.props.children}
                   onRowClick={this.props.onRowClick} />
      </Table>
    );
  }
}
