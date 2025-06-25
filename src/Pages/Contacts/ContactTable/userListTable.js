import React from 'react';
import { Grid, _ } from 'gridjs-react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap';

import avatar1 from '../../../assets/images/users/avatar-1.jpg';
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../assets/images/users/avatar-3.jpg';
import avatar4 from '../../../assets/images/users/avatar-4.jpg';
import avatar5 from '../../../assets/images/users/avatar-5.jpg';
import avatar6 from '../../../assets/images/users/avatar-6.jpg';
import avatar7 from '../../../assets/images/users/avatar-7.jpg';
import avatar8 from '../../../assets/images/users/avatar-8.jpg';
import avatar9 from '../../../assets/images/users/avatar-9.jpg';
import avatar10 from '../../../assets/images/users/avatar-10.jpg';


const UserListTable = () => {
    return (
        <React.Fragment>
            <Grid
                data={[
                    ["", [avatar1, "Simon Ryles"], "Full Stack Developer", "SimonRyles@symox.com", "$400", "Paid", "Mastercard", "View Details"],
                    ["", [avatar2, "Marion Walker"], "Frontend Developer", "MarionWalker@symox.com", "$452", "Chargeback", "Visa", "View Details"],
                    ["", [avatar3, " Marion Walker"], "UI/UX Designer", "FrederickWhite@symox.com", "$632", "Refund", "Paypal", "View Details"],
                    ["", [avatar4, " Shanon Marvin"], "Backend Developer", "ShanonMarvin@symox.com", "$521", "Refund", "COD", "View Details"],
                    ["", [avatar5, "Mark Jones"], "Frontend Developer", "MarkJones@symox.com", "$521", "Paid", "Mastercard", "View Details"],
                    ["", [avatar6, " Janice Morgan"], "Backend Developer", "JaniceMorgan@symox.com", "$365", "Chargeback", "Visa", "View Details"],
                    ["", [avatar7, "Patrick Petty"], "UI/UX Designer", "PatrickPetty@symox.com", "$452", "Paid", "Paypal", "View Details"],
                    ["", [avatar8, " Marilyn Horton"], "Backend Developer", "MarilynHorton@symox.com", "$365", "Paid", "COD", "View Details"],
                    ["", [avatar9, "Neal Womack"], "Full Stack Developer", "NealWomack@symox.com", "$254", "Refund", "COD", "View Details"],
                    ["", [avatar10, "Steven Williams"], "Frontend Developer", "StevenWilliams@symox.com", "$400", "Paid", "Mastercard", "View Details"],
                    ["", [avatar1, "Stacie Parker"], "Full Stack Developer", "StacieParker@symox.com", "$400", "Paid", "Mastercard", "View Details"],
                    ["", [avatar2, "Betty Wilson"], "Frontend Developer", "BettyWilson@symox.com", "$452", "Chargeback", "Visa", "View Details"],
                    ["", [avatar3, "Roman Crabtree"], "UI/UX Designer", "RomanCrabtree@symox.com", "$632", "Refund", "Paypal", "View Details"],
                    ["", [avatar4, "Marisela Butler"], "Backend Developer", "MariselaButler@symox.com", "$521", "Refund", "COD", "View Details"],
                    ["", [avatar5, "Roger Slayton"], "Frontend Developer", "RogerSlayton@symox.com", "$521", "Paid", "Mastercard", "View Details"],
                    ["", [avatar6, "Barbara Torres"], "Backend Developer", "BarbaraTorres@symox.com", "$365", "Chargeback", "Visa", "View Details"],
                    ["", [avatar7, "Daniel Rigney"], "UI/UX Designer", "DanielRigney@symox.com", "$452", "Paid", "Paypal", "View Details"],
                    ["", [avatar8, "Kenneth Linck"], "Backend Developer", "KennethLinck@symox.com", "$365", "Paid", "COD", "View Details"],
                    ["", [avatar9, "Felix Perry"], "Full Stack Developer", "FelixPerry@symox.com", "$254", "Refund", "COD", "View Details"],
                    ["", [avatar10, "Willie Verner"], "Frontend Developer", "WillieVerner@symox.com", "$400", "Paid", "Mastercard", "View Details"],
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
                        name: 'Name',
                        formatter: (cell) => _(<><img src={cell[0]} alt="" className="avatar-sm rounded-circle me-2" /> <a href="#/" className="text-body"> {cell[1]} </a></>)
                    },

                    "Position", "Email",
                    {
                        name: "View Details",
                        sort: {
                            enabled: false
                        },
                        formatter: (cell) =>
                            _(<>
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <a href="#/" id="Edit" className="px-2 text-primary"><i className="bx bx-pencil font-size-18"></i></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#/" id="Delete" className="px-2 text-danger"><i className="bx bx-trash-alt font-size-18"></i></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <UncontrolledDropdown direction='start'>
                                            <DropdownToggle className="text-muted font-size-18 px-2" tag="a" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-end">
                                                <DropdownItem>Action</DropdownItem>
                                                <DropdownItem>Another action</DropdownItem>
                                                <DropdownItem>Something else here</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                            <UncontrolledTooltip
                                                placement="top"
                                                target="Edit"
                                            >
                                                Edit
                                            </UncontrolledTooltip>

                                            <UncontrolledTooltip
                                                placement="top"
                                                target="Delete"
                                            >
                                                Delete
                                            </UncontrolledTooltip>
                                    </li>
                                </ul>
                            </>)
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

export default UserListTable;