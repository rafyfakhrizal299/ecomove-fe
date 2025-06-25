import React from 'react';
import { Grid, _ } from 'gridjs-react';
import { UncontrolledTooltip } from 'reactstrap';

const ShopsTable = () => {
    return (
        <React.Fragment>
            <Grid
                data={[
                    ["M", ["Nedick's", "Wayne McClain"], "WayneMcclain@gmail.com", "07/10/2021", "86", "$12,456"],
                    ["B", ["Brendle's", "David Marshall"], "Davidmarshall@gmail.com", "12/10/2021", "82", "$34,523"],
                    ["K", ["Tech Hifi", "Katia Stapleton"], "Katiastapleton@gmail.com", "14/11/2021", "75", "$63,265"],
                    ["P", ["Packer", "Mae Rankin"], "Maerankingmail.com", "14/11/2021", "62", "$42,652"],
                    ["L", ["Lafayette", "Andrew Bivens"], "Andrewbivens@gmail.com", "15/11/2021", "55", "$52,652"],
                    ["B", ["Tech Hifi", "John McLeroy"], "JohnmcLeroy@gmail.com", "20/11/2021", "53", "$12,523"],
                    ["K", ["Packer", "Katia Stapleton"], "Katiastapleton@gmail.com", "23/11/2021", "66", "63,523"],
                    ["P", ["Packer", "Mae Rankin"], "Maerankingmail.com", "14/11/2021", "62", "$42,652"],
                    ["L", ["Lafayette", "Andrew Bivens"], "Andrewbivens@gmail.com", "15/11/2021", "55", "$52,652"],
                    ["B", ["Tech Hifi", "John McLeroy"], "JohnmcLeroy@gmail.com", "20/11/2021", "53", "$12,523"],
                    ["K", ["Packer", "Katia Stapleton"], "Katiastapleton@gmail.com", "23/11/2021", "66", "63,523"],
                ]}
                columns={[
                    {
                        name: 'Brand',
                        formatter: (cell) => {
                            switch (cell) {
                                case "M":
                                    return _(<div className="avatar"><span className="avatar-title bg-primary-subtle text-primary font-size-16 rounded-circle"> {cell} </span></div>);

                                case "B":
                                    return _(<div className="avatar"><span className="avatar-title bg-warning-subtle text-warning font-size-16 rounded-circle"> {cell} </span></div>);

                                case "K":
                                    return _(<div className="avatar"><span className="avatar-title bg-success-subtle text-success font-size-16 rounded-circle"> {cell} </span></div>);

                                case "P":
                                    return _(<div className="avatar"><span className="avatar-title bg-danger-subtle text-danger font-size-16 rounded-circle"> {cell} </span></div>);

                                default:
                                    return _(<div className="avatar"><span className="avatar-title bg-primary-subtle text-primary font-size-16 rounded-circle">{cell}</span></div>);
                            }
                        }
                    },

                    {
                        name: 'Name',
                        formatter: (cell) => _(<><h5 className="font-size-15"> {cell[0]} </h5><p className="text-muted mb-0"> <i className="mdi mdi-account me-1"></i> {cell[1]} </p></>)
                    },

                    "Email", "Date", "Product", "Current Balance",

                    {
                        name: "Action",
                        formatter: (cell) => _(<><div className="d-flex gap-3">
                            <a href="#/" id="Edit" className="text-success">
                                <i className="mdi mdi-pencil font-size-18"></i></a>
                            <a href="#/" id="Delete" className="text-danger">
                                <i className="mdi mdi-delete font-size-18"></i></a>
                        </div>
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

                        </>)
                    }
                ]}
                search={true}
                sort={true}
                pagination={{
                    enabled: true,
                    limit: 7,
                }}
            />

        </React.Fragment>
    );
};

export default ShopsTable;