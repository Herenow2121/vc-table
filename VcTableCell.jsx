import React, { Component, PropTypes } from 'react';

/**
 * The `VcTableCell` component is responsible for
 * rendering non-editable table cells.
 */
export default class VcTableCell extends Component {
    
    static propTypes = {
        /**
         * The text alignment of the data in the cell.  This
         * is passed from the associated `VcTableColumnDefinition`
         * for this cell.
         */
        dataAlign: React.PropTypes.string,

        /**
         * The data to be rendered in the table cell.
         *
         * - The value could be a primitive. (string)
         * - The value could potentially be a React component. (dataFormat)
         */
        children: React.PropTypes.any
    };
    
    render() {

        var align = 'text-';
        align += (typeof this.props.dataAlign !== 'undefined') ? this.props.dataAlign : 'left';

        return (
            <td className={align}>{this.props.children}</td>
        );
    }
}