import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import VcTableColumnDefinition from './VcTableColumnDefinition'; //propTypes
import VcTableEditableCell from './VcTableEditableCell';
import VcTableCell from './VcTableCell';

/**
 * The `VcTableRow` component is responsible for rendering a
 * collection of `VcTableCell` and `VcTableEditableCell` in
 * an HTML table row.
 */
export default class VcTableRow extends Component {

    static propTypes = {

        /**
         * An individual record from the `data` property passed to
         * the `VcTable` component.
         */
        record: React.PropTypes.object,

        /**
         * A collection for `VcTableColumnDefinition` objects passed
         * as children to `VcTable`.
         */
        columns: React.PropTypes.instanceOf(VcTableColumnDefinition),

        /**
         * Callback to be executed on a row click as passed
         * in from the `VcTable` component.
         */
        onRowClick: React.PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            isEditMode: false,
            record: {}
        };
    }

    componentWillMount() {
        var isEditMode = false;
        if (this.props.record.isEditMode) {
            isEditMode = true;
        }

        this.setState({
            isEditMode: isEditMode,
            record: this.props.record
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            isEditMode: props.isEditMode,
            record: props.record
        });
    }

    _deepGet(record, sort) {

        if (typeof sort === 'undefined') {
            return '';
        }

        var s = sort.split('.');

        var obj = record[s.shift()];
        while (obj && s.length) {
            obj = obj[s.shift()];
        }

        return obj || '';
    }

    _formatTimestamp(field, format) {
        return moment(field).format(format);
    }

    getAggregateField(record, aggregateFields) {

        var self = this, out = '';

        aggregateFields.forEach(function(field, index) {
            out += self._deepGet(record, field);
            out += ' ';
        });

        return out.trim();
    }

    handleRecordChange(record, field, value) {
        record[field] = value;
        this.setState({
            record: record
        });
    }

    render() {

        var self = this;

        const record = this.state.record;

        var cells = [];
        this.props.columns.forEach(function(c, i) {

            var column = c.props, field;

            //aggregate fields
            if (typeof column.aggregateField !== 'undefined' && column.aggregateField.length > 0) {
                field = self.getAggregateField(record, column.aggregateField);
            } else {
                field = self._deepGet(record, column.sortField);
            }

            //time formats
            if (typeof column.timeFormat !== 'undefined') {
                field = self._formatTimestamp(field, column.timeFormat);
            }

            if (column.dataEditable) {

                var isEditMode = (self.state.isEditMode && typeof column.dataEditable !== 'undefined');

                //editable column conditions
                if (typeof column.dataEditable.on !== 'undefined' && column.dataEditable.on === 'newRecord' && !record.newRecord) {
                    isEditMode = false;
                }

                if (typeof column.dataEditable.on !== 'undefined' && column.dataEditable.on === 'existingRecord' && record.newRecord) {
                    isEditMode = false;
                }

                cells.push(<VcTableEditableCell key={i}
                                         record={record}
                                         editOptions={column.dataEditable}
                                         sortField={column.sortField}
                                         dataAlign={column.dataAlign}
                                         isEditMode={isEditMode}
                                         handleChange={self.handleRecordChange.bind(self)}>{field}</VcTableEditableCell>);
            } else if (column.dataFormat) {
                cells.push(<VcTableCell key={i} dataAlign={column.dataAlign}>{column.dataFormat(record)}</VcTableCell>);
            } else {
                cells.push(<VcTableCell key={i} dataAlign={column.dataAlign}>{field}</VcTableCell>)
            }
        });

        return (
            <tr onClick={this.props.onRowClick.bind(this, record)}>
                {cells}
            </tr>
        );
    }
}