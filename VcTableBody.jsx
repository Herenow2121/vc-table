import React, { Component, PropTypes } from 'react';

import VcTableColumnDefinition from './VcTableColumnDefinition'; //for prop types
import VcTableRow from './VcTableRow';

/**
 * The VcTableBody component is responsible for filtering
 * the `data` from `VcTable` and constructing `VcTableRow`
 * components.
 */
export default class VcTableBody extends Component {

    static propTypes = {
        /**
         * The `data` property passed to `VcTable`.
         */
        data: React.PropTypes.arrayOf(
            React.PropTypes.object
        ),

        /**
         * The `dataMin` property passed to `VcTable`
         */
        dataMin: React.PropTypes.number,

        /**
         * The `dataMax` property passed to `VcTable`
         */
        dataMax: React.PropTypes.number,

        /**
         * A collection of `VcTableColumnDefinition` objects
         * passed as children to `VcTable`
         */
        columns: React.PropTypes.arrayOf(
            React.PropTypes.instanceOf(VcTableColumnDefinition)
        ),

        /**
         * Callback to be executed on a row click as passed
         * in from the `VcTable` component.
         */
        onRowClick: React.PropTypes.func
    };

    constructor() {
        super();
    }

    render() {

        var self = this, filtered, rows;

        //filter data set when configured
        filtered = (typeof this.props.dataMin !== 'undefined' && typeof this.props.dataMax !== 'undefined') ?
            (this.props.data.filter(function(value, index) {
                return (index >= self.props.dataMin && index <= self.props.dataMax);
            })) : this.props.data;

        rows = filtered.map(function(record, index) {
            return (
                <VcTableRow
                    key={index}
                    record={record}
                    columns={self.props.columns}
                    onRowClick={self.props.onRowClick}
                    isEditMode={record.isEditMode}>
                </VcTableRow>
            );
        });

        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
}