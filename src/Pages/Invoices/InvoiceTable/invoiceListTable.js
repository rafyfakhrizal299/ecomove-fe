import React from 'react';
import { Grid, _ } from 'gridjs-react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const InvoiceListTable = () => {

    return (
        <React.Fragment>
            <Grid
                data={[
                    ["", "#DS0215", "07 Oct, 2021", "Connie Franco", "$26.30", "Paid", "View Details"],
                    ["", "#DS0214", "05 Oct, 2021", "Paul Reynolds", "$24.20", "Paid", "View Details"],
                    ["", "#DS0214", "06 Oct, 2021", "Ronald Patterson", "$65.32", "Pending", "View Details"],
                    ["", "#DS0212", "07 Oct, 2021", "Adella Perez", "$53.32", "Paid", "View Details"],
                    ["", "#DS0211", "07 Oct, 2021", "Theresa Mayers", "$13.21", "Paid", "View Details"],
                    ["", "#DS0210", "06 Oct, 2021", "Michael Wallace", "$23.41", "Pending", "View Details"],
                    ["", "#DS0209", "07 Oct, 2021", "Oliver Gonzales", "$41.23", "Pending", "View Details"],
                    ["", "#DS0208", "08 Oct, 2021", "David Burke", "$32.25", "Paid", "View Details"],
                    ["", "#DS0207", "09 Oct, 2021", "Willie Verner", "$53.21", "Pending", "View Details"],
                    ["", "#DS0206", "07 Oct, 2021", "Felix Perry", "$63.21", "Paid", "View Details"],
                    ["", "#SK4526", "05 Oct, 2021", "Stacie Parker", "$63.85", "Pending", "View Details"],
                    ["", "#SK8522", "06 Oct, 2021", "Betty Wilson", "$32.12", "Pending", "View Details"],
                    ["", "#SK4545", "07 Oct, 2021", "Roman Crabtree", "$45.62", "Paid", "View Details"],
                    ["", "#SK9652", "07 Oct, 2021", "Marisela Butler", "$62.35", "Pending", "View Details"],
                    ["", "#SK4256", "06 Oct, 2021", "Roger Slayton", "$45.62", "Paid", "View Details"],
                    ["", "#SK4125", "07 Oct, 2021", "Barbara Torres", "$42.63", "Paid", "View Details"],
                    ["", "#SK6523", "08 Oct, 2021", "Daniel Rigney", "$32.54", "Pending", "View Details"],
                    ["", "#SK6563", "09 Oct, 2021", "Kenneth Linck", "$52.62", "Pending", "View Details"],
                ]}
                columns={[
                    {
                        name: '#',
                        sort: {
                            enabled: false
                        },
                        formatter: (cell) => _(<div className="form-check font-size-16"><input className="form-check-input" type="checkbox" id="orderidcheck01" /><label className="form-check-label" htmlFor="orderidcheck01"></label></div>)
                    },
                    {
                        name: 'Order ID',
                        formatter: (cell) => _(<span className="fw-semibold"> {cell} </span>)
                    },
                    "Date", "Billing Name", "Amount",
                    {
                        name: 'Status',
                        formatter: (cell) => {
                            switch (cell) {
                                case "Paid":
                                    return _(<span className="badge badge-pill bg-success-subtle text-success font-size-12">{cell}</span>);

                                case "Pending":
                                    return _(<span className="badge badge-pill bg-warning-subtle text-warning font-size-12"> {cell} </span>);

                                default:
                                    return _(<span className="badge badge-pill bg-success-subtle text-success font-size-12"> {cell} </span>);
                            }
                        }
                    },
                    {
                        name: "Action",
                        sort: {
                            enabled: false
                        },
                        formatter: (cell) => {
                            return _(

                                <UncontrolledDropdown>
                                    <DropdownToggle className="btn btn-light btn-sm" tag="button" data-bs-toggle="dropdown">
                                        <i className="bx bx-dots-horizontal-rounded"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem>Edit</DropdownItem>
                                        <DropdownItem>Print</DropdownItem>
                                        <DropdownItem>Delete</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            );
                        }
                    }
                ]}
                search={true}
                sort={true}
                pagination={{
                    enabled: true,
                    limit: 10,
                }}
            />

        </React.Fragment>
    )
}

export default InvoiceListTable;