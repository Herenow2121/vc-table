import React, { Component, PropTypes } from 'react';

/**
 * The `VcTableHeaderCell` is responsible for rendering
 * sortable HTML table headers by `VcTableColumnDefinition`.
 */
export default class VcTableHeaderCell extends Component {

    static propTypes = {
        /**
         * The `onSort` callback passed as a property to the
         * `VcTableColumnDefinition` component.
         */
        onSort: React.PropTypes.func,

        /**
         * The order of the active sort column passed to this
         * component by `VcTable` as a property.
         * - This is maintained as state on the `VcTable` component
         */
        sortOrder: React.PropTypes.string,

        /**
         * The `sortField` parameter passed as a property to
         * the `VcTableColumnDefinition` component.
         */
        sortField: React.PropTypes.string,

        /**
         * The instance of `VcTableColumnDefinition` passed as
         * a child to the `VcTable` component.
         */
        column: React.PropTypes.object,

        /**
         * The column label passed as a child to the `VcTableColumnDefinition`
         * component.
         */
        children: React.PropTypes.object
    };

    constructor() {
        super();
    }

    handleColumnSort(event) {
        var order = (!this.props.sortOrder) ? 'desc' : (this.props.sortOrder === 'desc') ? 'asc' : 'desc';
        this.props.onSort(this.props.column.props.sortField, order);
    }

    render() {

        var head = null, sort = null, column = this.props.column;

        if (typeof column.props.sortField !== 'undefined') { //is current sort column

            var isSortable = (this.props.sortField === column.props.sortField);
            if (isSortable) {
                sort = (
                    <span className="order">
                      {(() => {
                          switch(this.props.sortOrder) {
                              case 'desc': return (<span className="order"><span className="dropdown"><span className="caret"></span></span></span>);
                              case 'asc': return (<span className="order"><span className="dropup"><span className="caret"></span></span></span>);
                          }
                      })()}
                    </span>
                );
            } else {
                sort = (
                    <span className="order"><span className="dropdown"><span className="caret"></span></span><span className="dropup"><span className="caret"></span></span></span>
                );
            }

            head = (
                <th onClick={this.handleColumnSort.bind(this)}>
                    {this.props.children}
                    {sort}
                </th>
            );

        } else {
            head = (
                <th>
                    {this.props.children}
                </th>
            );
        }

        return (head);
    }
}