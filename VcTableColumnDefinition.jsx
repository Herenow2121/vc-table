import React, { Component, PropTypes } from 'react';

/**
 * The VcTableColumnDefinition component is a placeholder
 * that is responsible for defining table structure.
 *
 * # Examples
 *
 * - Nested Object Properties
 * ```JSX
 *  users = [{
 *    user: {
 *      firstNm: "John",
 *      lastNm: "Doe",
 *      email: "jdoe@mailinator.com"
 *    }
 *  }, {
 *    user: {
 *      firstNm: "Jane",
 *      lastNm: "Doe",
 *      email: "jadoe@mailinator.com"
 *    }
 *  }];
 *
 * <VcTable data={consumerApps}>
 *   <VcTableColumnDefinition sortField="user.firstNm">First Name</VcTableColumnDefinition>
 *   <VcTableColumnDefinition sortField="user.lastNm">Last Name</VcTableColumnDefinition>
 *   <VcTableColumnDefinition sortField="user.email">Email</VcTableColumnDefinition>
 * </VcTable>
 * ```
 *
 * - Editable Table Cells
 * ```JSX
 *  const editOptions = {
 *    type: 'select',
 *    options: [
 *      { value: 'Option1Value', label: 'Option 1 Label' },
 *      { value: 'Option2Value', label: 'Option 2 Label' }
 *    ]
 *  };
 *
 *  <VcTable data={testData}>
 *    <VcTableColumnDefinition dataEditable={{type: 'text'}} sortField="textField">Text Field</VcTableColumnDefinition>
 *    <VcTableColumnDefinition dataEditable={editOptions} sortField="selectField">Select Field</VcTableColumnDefinition>
 *  </VcTable>
 * ```
 *
 * - Custom Formatted Cells
 * ```JSX
 *  formatter(record) {
 *      return (<button className="btn-link" onClick={this.onClick.bind(this, record)}></button>);
 *  } //ES6 class method
 *
 *  const buttonFormat = (<SomeOtherComponent prop1="prop1" />);
 *
 *  <VcTable data={testData}>
 *    <VcTableColumnDefinition sortField="prop1" dataFormat={this.formatter.bind(this)}></VcTableColumnDefinition>
 *    <VcTableColumnDefinition sortField="prop2" dataFormat={buttonFormat}></VcTableColumnDefinition>
 *  </VcTable>
 * ```
 *
 * - Aggregate Fields
 * ```JSX
 *  <VcTable data={testData}>
 *    <VcTableColumnDefinition sortField="prop1" aggregateField={['field1', 'user.field2']}></VcTableColumnDefinition>
 *    <VcTableColumnDefinition sortField="prop2"></VcTableColumnDefinition>
 *  </VcTable>
 * ```
 */
export default class VcTableColumnDefinition extends Component {

    static propTypes = {
        /**
         * A string that identifies the object property to be used for
         * both the value of each table cell as well as the field used
         * to sort the column.
         */
        sortField: React.PropTypes.string,

        /**
         * An array of strings that identify the object properties to
         * concatenate as the value of each table cell.
         */
        aggregateField: React.PropTypes.arrayOf(
            React.PropTypes.string
        ),

        /**
         * A method of the parent React class that returns a single 
         * React component representing the contents of each table cell. 
         */
        dataFormat: React.PropTypes.func,

        /**
         * An object that indicates a given field is editable and defines
         * the options for the VcTableEditableCell component.
         *
         * - `type` **(required)**: The type of input field used in the
         *    editable column.  Accepts 'text' or 'select'.
         * - `on`: Specify whether the data is editable on new records or
         *    existing records.  Accepts 'newRecord' or 'existingRecord'.
         * - `options`: An array of options objects for editable fields
         *   of the type 'select'.
         * -- `options:value`: The value of the select options.
         * -- `options:label`: The option text.
         */
        dataEditable: React.PropTypes.shape({
            type: React.PropTypes.string,
            on: React.PropTypes.string,
            options: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    value: React.PropTypes.string,
                    label: React.PropTypes.string
                })
            )
        }),

        /**
         * A string representing the table cell alignment for a column.
         */
        dataAlign: React.PropTypes.string
    };

    render() {
        return null;
    }
}