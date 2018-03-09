# Overview

VcTable is a react component that is responsible for rendering arbitrary collections of data in a HTML table.  The supporting components are documented below.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
VcTable Component Reference

  - [VcTable](#VcTable)
  - [VcTableBody](#VcTablebody)
  - [VcTableCell](#VcTablecell)
  - [VcTableColumnDefinition](#VcTablecolumndefinition)
- [Examples](#examples)
  - [VcTableEditableCell](#VcTableeditablecell)
  - [VcTableHead](#VcTablehead)
  - [VcTableHeaderCell](#VcTableheadercell)
  - [VcTableRow](#VcTablerow)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## VcTable

From [`VcTable/VcTable.jsx`](VcTable/VcTable.jsx)

The VcTable component is responsible for rendering
arbitrary collections of data in a HTML table.

### Dependencies
- React
- React Bootstrap
- Moment.js

### Notes
- The `VcTable` and `VcTableColumnDefinition` components are the only public components.

### Examples

- Basic Usage
```JSX
 consumerApps = [{
   firstNm: 'first name',
   lastNm: 'last name',
   email: 'flast@mailinator.com'
 }];

 <VcTable data={consumerApps}>
   <VcTableColumnDefinition sortField="firstNm">First Name</VcTableColumnDefinition>
   <VcTableColumnDefinition sortField="lastNm">Last Name</VcTableColumnDefinition>
   <VcTableColumnDefinition sortField="email">Email</VcTableColumnDefinition>
 </VcTable>
```

- Sort and Row Click Callbacks
```JSX

onTableSort(records) {
  //all sorted records
}

onTableRowClick(record) {
  //record associated to selected row
}

<VcTable data={testData} onSort={this.onTableSort} onRowClick={this.onTableRowClick}>
   <VcTableColumnDefinition sortField="firstNm">First Name</VcTableColumnDefinition>
   <VcTableColumnDefinition sortField="lastNm">Last Name</VcTableColumnDefinition>
   <VcTableColumnDefinition sortField="email">Email</VcTableColumnDefinition>
 </VcTable>
```

#### data

```js
data: [Object, ...]
```

The data to be rendered as a table.

- Expects a collection of object literals.
- Composed objects are allowed and can be deeply nested and referenced by `TableColumnDefinition`.

#### dataMax

```js
dataMax: React.PropTypes.Number (custom validator)
```

Restrict the data set to a specific range of records
by index using `dataMax` and `dataMin`.

#### dataMin

```js
dataMin: React.PropTypes.Number (custom validator)
```

Restrict the data set to a specific range of records
by index using `dataMin` and `dataMax`.

#### onRowClick

```js
onRowClick: Function
```

This callback is executed when a row is clicked.  The
associated row object will be passed as an argument.

#### onSort

```js
onSort: Function
```

This callback is executed when VcTable sorts `data`.

<br><br>

## VcTableBody

From [`VcTable/VcTableBody.jsx`](VcTable/VcTableBody.jsx)

The VcTableBody component is responsible for filtering
the `data` from `VcTable` and constructing `VcTableRow`
components.

#### columns

```js
columns: [instanceOf, ...]
```

A collection of `VcTableColumnDefinition` objects
passed as children to `VcTable`

#### data

```js
data: [Object, ...]
```

The `data` property passed to `VcTable`.

#### dataMax

```js
dataMax: Number
```

The `dataMax` property passed to `VcTable`

#### dataMin

```js
dataMin: Number
```

The `dataMin` property passed to `VcTable`

#### onRowClick

```js
onRowClick: Function
```

Callback to be executed on a row click as passed
in from the `VcTable` component.

<br><br>

## VcTableCell

From [`VcTable/VcTableCell.jsx`](VcTable/VcTableCell.jsx)

The `VcTableCell` component is responsible for
rendering non-editable table cells.

#### children

```js
children: *
```

The data to be rendered in the table cell.

- The value could be a primitive. (string)
- The value could potentially be a React component. (dataFormat)

#### dataAlign

```js
dataAlign: String
```

The text alignment of the data in the cell.  This
is passed from the associated `VcTableColumnDefinition`
for this cell.

<br><br>

## VcTableColumnDefinition

From [`VcTable/VcTableColumnDefinition.jsx`](VcTable/VcTableColumnDefinition.jsx)

The VcTableColumnDefinition component is a placeholder
that is responsible for defining table structure.

# Examples

- Nested Object Properties
```JSX
 consumerApps = [{
   userDTO: {
     firstNm: "John",
     lastNm: "Doe",
     email: "jdoe@mailinator.com"
   }
 }, {
   userDTO: {
     firstNm: "Jane",
     lastNm: "Doe",
     email: "jadoe@mailinator.com"
   }
 }];

<VcTable data={consumerApps}>
  <VcTableColumnDefinition sortField="userDTO.firstNm">First Name</VcTableColumnDefinition>
  <VcTableColumnDefinition sortField="userDTO.lastNm">Last Name</VcTableColumnDefinition>
  <VcTableColumnDefinition sortField="userDTO.email">Email</VcTableColumnDefinition>
</VcTable>
```

- Editable Table Cells
```JSX
 const editOptions = {
   type: 'select',
   options: [
     { value: 'Option1Value', label: 'Option 1 Label' },
     { value: 'Option2Value', label: 'Option 2 Label' }
   ]
 };

 <VcTable data={testData}>
   <VcTableColumnDefinition dataEditable={{type: 'text'}} sortField="textField">Text Field</VcTableColumnDefinition>
   <VcTableColumnDefinition dataEditable={editOptions} sortField="selectField">Select Field</VcTableColumnDefinition>
 </VcTable>
```

- Custom Formatted Cells
```JSX
 formatter(record) {
     return (<button className="btn-link" onClick={this.onClick.bind(this, record)}></button>);
 } //ES6 class method

 const buttonFormat = (<SomeOtherComponent prop1="prop1" />);

 <VcTable data={testData}>
   <VcTableColumnDefinition sortField="prop1" dataFormat={this.formatter.bind(this)}></VcTableColumnDefinition>
   <VcTableColumnDefinition sortField="prop2" dataFormat={buttonFormat}></VcTableColumnDefinition>
 </VcTable>
```

- Aggregate Fields
```JSX
 <VcTable data={testData}>
   <VcTableColumnDefinition sortField="prop1" aggregateField={['field1', 'user.field2']}></VcTableColumnDefinition>
   <VcTableColumnDefinition sortField="prop2"></VcTableColumnDefinition>
 </VcTable>
```

#### aggregateField

```js
aggregateField: [String, ...]
```

An array of strings that identify the object properties to
concatenate as the value of each table cell.

#### dataAlign

```js
dataAlign: String
```

A string representing the table cell alignment for a column.

#### dataEditable

```js
dataEditable: {
    type: String
    on: String
    options: [{
        value: String
        label: String
    }, ...]
}
```

An object that indicates a given field is editable and defines
the options for the VcTableEditableCell component.

- `type` **(required)**: The type of input field used in the
   editable column.  Accepts 'text' or 'select'.
- `on`: Specify whether the data is editable on new records or
   existing records.  Accepts 'newRecord' or 'existingRecord'.
- `options`: An array of options objects for editable fields
  of the type 'select'.
-- `options:value`: The value of the select options.
-- `options:label`: The option text.

#### dataFormat

```js
dataFormat: Function
```

A method of the parent React class that returns a single
React component representing the contents of each table cell.

#### sortField

```js
sortField: String
```

A string that identifies the object property to be used for
both the value of each table cell as well as the field used
to sort the column.

<br><br>

## VcTableEditableCell

From [`VcTable/VcTableEditableCell.jsx`](VcTable/VcTableEditableCell.jsx)

The `VcTableEditableCell` is responsible for rendering
editable table cells.

Each cell should contain a value that maps to an HTML
input field via the `VcTableColumnDefinition` component.

#### children

```js
children: String
```

The data to be rendered in the table cell or as
the value of the editable cell's input field.

#### dataAlign

```js
dataAlign: String
```

The text alignment of the data in the cell.  This
is passed from the associated `VcTableColumnDefinition`
for this cell.

#### editOptions

```js
editOptions: {
    type: String
    on: String
    options: [{
        value: String
        label: String
    }, ...]
}
```

An object representing how a particular table cell's
data should be represented as an input field.

#### isEditMode

```js
isEditMode: Boolean
```

A boolean that represents whether or not the cell is
in edit mode.

#### record

```js
record: Object
```

The entire record to which this cell belongs.

#### sortField

```js
sortField: String
```

The `sortField` property passed to `VcTable`

<br><br>

## VcTableHead

From [`VcTable/VcTableHead.jsx`](VcTable/VcTableHead.jsx)

The `VcTableHead` component is responsible for rendering
column definitions in a HTML table header and row.

#### children

```js
children: instanceOf
```

A collection of `VcTableHeaderCell` objects that
are created from `VcTableColumnDefinition`.

<br><br>

## VcTableHeaderCell

From [`VcTable/VcTableHeaderCell.jsx`](VcTable/VcTableHeaderCell.jsx)

The `VcTableHeaderCell` is responsible for rendering
sortable HTML table headers by `VcTableColumnDefinition`.

#### children

```js
children: Object
```

The column label passed as a child to the `VcTableColumnDefinition`
component.

#### column

```js
column: Object
```

The instance of `VcTableColumnDefinition` passed as
a child to the `VcTable` component.

#### onSort

```js
onSort: Function
```

The `onSort` callback passed as a property to the
`VcTableColumnDefinition` component.

#### sortField

```js
sortField: String
```

The `sortField` parameter passed as a property to
the `VcTableColumnDefinition` component.

#### sortOrder

```js
sortOrder: String
```

The order of the active sort column passed to this
component by `VcTable` as a property.
- This is maintained as state on the `VcTable` component

<br><br>

## VcTableRow

From [`VcTable/VcTableRow.jsx`](VcTable/VcTableRow.jsx)

The `VcTableRow` component is responsible for rendering a
collection of `VcTableCell` and `VcTableEditableCell` in
an HTML table row.

#### columns

```js
columns: instanceOf
```

A collection for `VcTableColumnDefinition` objects passed
as children to `VcTable`.

#### onRowClick

```js
onRowClick: Function
```

Callback to be executed on a row click as passed
in from the `VcTable` component.

#### record

```js
record: Object
```

An individual record from the `data` property passed to
the `VcTable` component.

<br><br>
