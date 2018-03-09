import React, { Component, PropTypes } from 'react';

import VcTableHeaderCell from './VcTableHeaderCell'; //for prop types

/**
 * The `VcTableHead` component is responsible for rendering
 * column definitions in a HTML table header and row.
 */
export default class VcTableHead extends Component {
    
    static propTypes = {
        /**
         * A collection of `VcTableHeaderCell` objects that
         * are created from `VcTableColumnDefinition`.
         */
        children: React.PropTypes.instanceOf(VcTableHeaderCell)
    };
    
    render() {
        return (
            <thead>
                <tr>
                    {this.props.children}
                </tr>
            </thead>
        );
    }
}
