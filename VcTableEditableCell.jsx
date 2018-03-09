import React, { Component, PropTypes } from 'react';

import VcTableCell from './VcTableCell';

/**
 * The `VcTableEditableCell` is responsible for rendering
 * editable table cells.
 *
 * Each cell should contain a value that maps to an HTML
 * input field via the `VcTableColumnDefinition` component.
 */
export default class VcTableEditableCell extends Component {

    static propTypes = {

        /**
         * A boolean that represents whether or not the cell is
         * in edit mode.
         */
        isEditMode: React.PropTypes.bool,

        /**
         * The entire record to which this cell belongs.
         */
        record: React.PropTypes.object,

        /**
         * The `sortField` property passed to `VcTable`
         */
        sortField: React.PropTypes.string,

        /**
         * An object representing how a particular table cell's
         * data should be represented as an input field.
         */
        editOptions: React.PropTypes.shape({
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
         * The text alignment of the data in the cell.  This
         * is passed from the associated `VcTableColumnDefinition`
         * for this cell.
         */
        dataAlign: React.PropTypes.string,

        /**
         * The data to be rendered in the table cell or as
         * the value of the editable cell's input field.
         */
        children: React.PropTypes.string
    };

    componentWillMount() {
        this.setState({
            isEditMode: this.props.isEditMode,
            record: this.props.record
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            isEditMode: props.isEditMode,
            record: props.record
        });
    }

    handleChange(event) {
        event.preventDefault();
        this.props.handleChange(this.props.record, this.props.sortField, event.target.value);
    }

    render() {

        var self = this, cellHtml = null;

        if (this.state.isEditMode) {

            switch(this.props.editOptions.type) {
                case 'text':
                    cellHtml = (<input type='text' value={this.props.children} onChange={this.handleChange.bind(this)} />);
                    break;
                case 'select':
                    cellHtml = (
                        <select onChange={this.handleChange.bind(this)} defaultValue={self.state.record[self.props.sortField]}>
                            {this.props.editOptions.options.map(function(item, index) {
                                return (<option key={index} value={item.value}>{item.label}</option>);
                            })}
                        </select>
                    );
                    break;
            }

        } else {

            if (typeof this.props.editOptions !== 'undefined' && this.props.editOptions.type === 'select') {
                var self = this;
                this.props.editOptions.options.forEach(function(item) {
                    if (item.value == self.props.children) {
                        cellHtml = (<span>{item.label}</span>);
                    }
                })
            } else {
                cellHtml = (<span>{this.props.children}</span>);
            }
        }

        return (
            <VcTableCell dataAlign={this.props.dataAlign}>{cellHtml}</VcTableCell>
        );
    }
}