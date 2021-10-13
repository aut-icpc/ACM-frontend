import React from "react"
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Select, Grid,
    FormControl, Input, InputLabel, MenuItem, Button, Checkbox
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import ReCAPTCHA from "react-google-recaptcha";
import "./../../styles/register.css"
import axios from 'axios'
import LocalRules from "../Rules/LocalRules"
import RegionalRules from "../Rules/RegionalRules"
import PersonIcon from '@material-ui/icons/Person';
import validator from 'validator';

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            team_name: "",
            team_error: "",
            institution: "",
            institution_error: "",
            rules: false,
            local_rules: false,
            regional_rules: false,

            // ### 1 ###
            //First Contestant Info
            first_name_1: "",
            last_name_1: "",
            gender_1: "",
            shirt_size_1: "L",
            edu_level_1: "",
            student_number_1: "",
            email_1: "",
            phone_number_1: "",
            document_1: "",
            accept_share_info_1: "",

            //First Contestant errors
            first_name_1_error: "",
            last_name_1_error: "",
            gender_1_error: "",
            shirt_size_1_error: "",
            edu_level_1_error: "",
            student_number_1_error: "",
            email_1_error: "",
            phone_number_1_error: "",
            document_1_error: "",

            // ### 2 ###
            //Second Contestant Info
            first_name_2: "",
            last_name_2: "",
            gender_2: "",
            shirt_size_2: "L",
            edu_level_2: "",
            student_number_2: "",
            email_2: "",
            phone_number_2: "",
            document_2: "",
            accept_share_info_2: "",

            //Second Contestant errors
            first_name_2_error: "",
            last_name_2_error: "",
            gender_2_error: "",
            shirt_size_2_error: "",
            edu_level_2_error: "",
            student_number_2_error: "",
            email_2_error: "",
            phone_number_2_error: "",
            document_2_error: "",

            // ### 3 ###
            //Third Contestant Info
            first_name_3: "",
            last_name_3: "",
            gender_3: "",
            shirt_size_3: "L",
            edu_level_3: "",
            student_number_3: "",
            email_3: "",
            phone_number_3: "",
            document_3: "",
            accept_share_info_3: "",

            //Third Contestant errors
            first_name_3_error: "",
            last_name_3_error: "",
            gender_3_error: "",
            shirt_size_3_error: "",
            edu_level_3_error: "",
            student_number_3_error: "",
            email_3_error: "",
            phone_number_3_error: "",
            document_3_error: "",

            recaptcha: "",
        }
        this.field_alert = "0"
        this.duplication_error_string = ""
        this.duplication_error_string_alert = "0"
        this.handleChange = this.handleChange.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.handleShareInfoChange = this.handleShareInfoChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.OpenLocalRules = this.OpenLocalRules.bind(this)
        this.CloseLocalRules = this.CloseLocalRules.bind(this)
        this.OpenRegionalRules = this.OpenRegionalRules.bind(this)
        this.CloseRegionalRules = this.CloseRegionalRules.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(value) {
        this.setState({
            recaptcha: value
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,

            team_error: "",
            institution_error: "",

            first_name_1_error: "",
            last_name_1_error: "",
            gender_1_error: "",
            shirt_size_1_error: "",
            edu_level_1_error: "",
            student_number_1_error: "",
            email_1_error: "",
            phone_number_1_error: "",
            document_1_error: "",

            first_name_2_error: "",
            last_name_2_error: "",
            gender_2_error: "",
            shirt_size_2_error: "",
            edu_level_2_error: "",
            student_number_2_error: "",
            email_2_error: "",
            phone_number_2_error: "",
            document_2_error: "",

            first_name_3_error: "",
            last_name_3_error: "",
            gender_3_error: "",
            shirt_size_3_error: "",
            edu_level_3_error: "",
            student_number_3_error: "",
            email_3_error: "",
            phone_number_3_error: "",
            document_3_error: "",
        })
        this.field_alert = "0"
        this.duplication_error_string = ""
        this.duplication_error_string_alert = "0"
    }

    OpenLocalRules() {
        this.setState({
            local_rules: true
        })
    }
    CloseLocalRules() {
        this.setState({
            local_rules: false
        })
    }

    OpenRegionalRules() {
        this.setState({
            regional_rules: true
        })
    }
    CloseRegionalRules() {
        this.setState({
            regional_rules: false
        })
    }
    handleCheckboxChange(event) {
        this.setState({
            rules: event.target.checked
        })
    }

    handleShareInfoChange(event) {
        this.setState({
            [event.target.name]: event.target.checked
        })
    }

    handleFileChange(event) {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.rules === true) {
            if (!validator.isEmail(this.state.email_1)) {
                this.duplication_error_string = "Contestant #1 email is invalid!"
                this.duplication_error_string_alert = "1"
            }
            if (!validator.isEmail(this.state.email_2)) {
                this.duplication_error_string += "\nContestant #2 email is invalid!"
                this.duplication_error_string_alert = "1"
            }
            if (!validator.isEmail(this.state.email_3)) {
                this.duplication_error_string += "\nContestant #3 email is invalid!"
                this.duplication_error_string_alert = "1"
            }

            if (!validator.isMobilePhone(this.state.phone_number_1, 'fa-IR')) {
                this.duplication_error_string += "\nContestant #1 Phone Number is invalid!"
                this.duplication_error_string_alert = "1"
            }
            if (!validator.isMobilePhone(this.state.phone_number_2, 'fa-IR')) {
                this.duplication_error_string += "\nContestant #2 Phone Number is invalid!"
                this.duplication_error_string_alert = "1"
            }
            if (!validator.isMobilePhone(this.state.phone_number_3, 'fa-IR')) {
                this.duplication_error_string += "\nContestant #3 Phone Number is invalid!"
                this.duplication_error_string_alert = "1"
            }

            if (this.state.email_1 === this.state.email_2 ||
                this.state.email_1 === this.state.email_3 ||
                this.state.email_3 === this.state.email_2) {
                this.duplication_error_string += "\nYou have entered duplicate Email!"
                this.duplication_error_string_alert = "1"
            }

            if (this.state.student_number_1 === this.state.student_number_2 ||
                this.state.student_number_1 === this.state.student_number_3 ||
                this.state.student_number_2 === this.state.student_number_3) {
                this.duplication_error_string += "\nYou have entered duplicate National ID!"
                this.duplication_error_string_alert = "1"
            }

            if (this.state.phone_number_1 === this.state.phone_number_2 ||
                this.state.phone_number_1 === this.state.phone_number_3 ||
                this.state.phone_number_2 === this.state.phone_number_3) {
                this.duplication_error_string += "\nYou have entered duplicate Phone Number!"
                this.duplication_error_string_alert = "1"
            }


            if (this.state.team_name === "") {
                this.setState({
                    team_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.institution === "") {
                this.setState({
                    institution_error: "error",
                })
                this.field_alert = "1"
            }


            if (this.state.first_name_1 === "") {
                this.setState({
                    first_name_1_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.last_name_1 === "") {
                this.setState({
                    last_name_1_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.gender_1 === "") {
                this.setState({
                    gender_1_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.shirt_size_1 === "") {
                this.setState({
                    shirt_size_1_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.edu_level_1 === "") {
                this.setState({
                    edu_level_1_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.student_number_1 === "") {
                this.setState({
                    student_number_1_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.email_1 === "") {
                this.setState({
                    email_1_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.phone_number_1 === "") {
                this.setState({
                    phone_number_1_error: "error",
                })
                this.field_alert = "1"
            }


            if (this.state.first_name_2 === "") {
                this.setState({
                    first_name_2_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.last_name_2 === "") {
                this.setState({
                    last_name_2_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.gender_2 === "") {
                this.setState({
                    gender_2_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.shirt_size_2 === "") {
                this.setState({
                    shirt_size_2_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.edu_level_2 === "") {
                this.setState({
                    edu_level_2_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.student_number_2 === "") {
                this.setState({
                    student_number_2_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.email_2 === "") {
                this.setState({
                    email_2_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.phone_number_2 === "") {
                this.setState({
                    phone_number_2_error: "error",
                })
                this.field_alert = "1"
            }


            if (this.state.first_name_3 === "") {
                this.setState({
                    first_name_3_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.last_name_3 === "") {
                this.setState({
                    last_name_3_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.gender_3 === "") {
                this.setState({
                    gender_3_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.shirt_size_3 === "") {
                this.setState({
                    shirt_size_3_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.edu_level_3 === "") {
                this.setState({
                    edu_level_3_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.student_number_3 === "") {
                this.setState({
                    student_number_3_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.email_3 === "") {
                this.setState({
                    email_3_error: "error",
                })
                this.field_alert = "1"
            }
            if (this.state.phone_number_3 === "") {
                this.setState({
                    phone_number_3_error: "error",
                })
                this.field_alert = "1"
            }

            if (this.state.document_1 === null) {
                this.setState({
                    document_1_error: 'Empty',
                })
                this.field_alert = "1"
            }
            if (this.state.document_2 === null) {
                this.setState({
                    document_2_error: 'Empty',
                })
                this.field_alert = "1"
            }
            if (this.state.document_3 === null) {
                this.setState({
                    document_3_error: 'Empty',
                })
                this.field_alert = "1"
            }

            if (this.field_alert === "1") {
                alert("Please fill empty fields!")
            }
            else if (this.duplication_error_string_alert === "1") {
                alert(this.duplication_error_string)
            }

            else {
                const cont1 = {
                    first_name: this.state.first_name_1,
                    last_name: this.state.last_name_1,
                    gender: this.state.gender_1,
                    shirt_size: this.state.shirt_size_1,
                    edu_level: this.state.edu_level_1,
                    student_number: this.state.student_number_1,
                    email: this.state.email_1,
                    phone_number: this.state.phone_number_1,
                    accept_share_info: this.state.accept_share_info_1 ? true : false,
                }
                const cont2 = {
                    first_name: this.state.first_name_2,
                    last_name: this.state.last_name_2,
                    gender: this.state.gender_2,
                    shirt_size: this.state.shirt_size_2,
                    edu_level: this.state.edu_level_2,
                    student_number: this.state.student_number_2,
                    email: this.state.email_2,
                    phone_number: this.state.phone_number_2,
                    accept_share_info: this.state.accept_share_info_2 ? true : false,
                }
                const cont3 = {
                    first_name: this.state.first_name_3,
                    last_name: this.state.last_name_3,
                    gender: this.state.gender_3,
                    shirt_size: this.state.shirt_size_3,
                    edu_level: this.state.edu_level_3,
                    student_number: this.state.student_number_3,
                    email: this.state.email_3,
                    phone_number: this.state.phone_number_3,
                    accept_share_info: this.state.accept_share_info_3 ? true : false,
                }
                const data = {
                    name: this.state.team_name,
                    institution: this.state.institution,
                    recaptcha: this.state.recaptcha,
                    contestants: [
                        cont1, cont2, cont3
                    ],
                    is_high: true
                }

                const bodyFormData = new FormData();

                bodyFormData.append('data', JSON.stringify(data));
                bodyFormData.append('document_1', this.state.document_1);
                bodyFormData.append('document_2', this.state.document_2);
                bodyFormData.append('document_3', this.state.document_3);

                axios({
                    url: process.env.REACT_APP_URL + "/api/register/team/onsite",
                    method: 'POST',
                    data: bodyFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log("successful");
                    window.location.replace('/successfulRegistration')
                }).catch(error => {
                    if (error.response) {
                        console.log(error.response);
                    }
                })
            }
        }
        else {
            alert("Please Check Rules!")
        }
    }

    render() {
        return (
            <form className="register_container"
                onSubmit={this.onSubmit}
            >
                <h1 className="register_page_header">Online Contest Registration</h1>
                <h3 className="register_page_second_header">21st Amirkabir Collegiate Programming Contest - 29th of October 2021</h3>
                <div className="register_page_p">
                    <p>
                        Please fill all of the following fields carefully and then press the&nbsp;
                        <strong>Submit</strong> button to make your team registered.<br />
                    </p>
                    <p>
                        Registration fee is as follows:<br />
                        120,000 Tomans for high school teams (40,000 Tomans for each contestant).<br />
                    </p>
                    <p>
                        If your team name was not in the registered teams list 24 hours after regitration, please inform us by:<br />
                        Email: <a href="mailto:ceit.ssc94@gmail.com">ceit.ssc94@gmail.com</a><br />
                        Telegram: <a href="https://t.me/ceitssc">@ceitssc</a> <br />
                    </p>
                </div>
                <div className="team_box">
                    <div className="team_header_box">
                        <PeopleIcon />
                        <h2 className="team_header">Team Information</h2>
                    </div>
                    <div>
                        <FormControl required>
                            <InputLabel htmlFor="team_name">Team Name</InputLabel>
                            <Input
                                error={this.state.team_error}
                                className="text_box"
                                name="team_name"
                                type="text"
                                onChange={this.handleChange}
                                inputProps={{ maxLength: "25" }}
                            />
                        </FormControl>
                        <FormControl required>
                            <InputLabel htmlFor="institution">Institution</InputLabel>
                            <Input
                                error={this.state.institution_error}
                                className="text_box"
                                name="institution"
                                type="text"
                                placeholder="Your High School Name"
                                onChange={this.handleChange}
                                inputProps={{ maxLength: "50" }}
                            />
                        </FormControl>
                    </div>
                </div>
                <br />

                <div className="contestant_header_box">
                    <PersonIcon />
                    <h2 className="contestant_header">Contestant #1</h2>
                </div>
                <div className="contestant_box">
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="first_name">First Name</InputLabel>
                        <Input
                            error={this.state.first_name_1_error}
                            className="text_box"
                            name="first_name_1"
                            type="text"
                            onChange={this.handleChange}
                            inputProps={{ maxLength: "30" }}
                        />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="last_name">Last Name</InputLabel>
                        <Input
                            error={this.state.last_name_1_error}
                            className="text_box"
                            name="last_name_1"
                            type="text"
                            onChange={this.handleChange}
                            inputProps={{ maxLength: "30" }}
                        />
                    </FormControl>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select
                            error={this.state.gender_1_error}
                            className="text_box"
                            value={this.state.gender_1}
                            onChange={this.handleChange}
                            name="gender_1"
                        >
                            <MenuItem value={"M"}>Male</MenuItem>
                            <MenuItem value={"F"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="student_number">National ID</InputLabel>
                        <Input
                            error={this.state.student_number_1_error}
                            className="text_box"
                            type="number"
                            name="student_number_1"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="edu_level">Current Educational Level</InputLabel>
                        <Select
                            error={this.state.edu_level_1_error}
                            className="text_box"
                            value={this.state.edu_level_1}
                            onChange={this.handleChange}
                            name="edu_level_1"
                        >
                            <MenuItem value={"BSC"}>10th - High School</MenuItem>
                            <MenuItem value={"MSC"}>11th - High School</MenuItem>
                            <MenuItem value={"PHD"}>12th - High School</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            error={this.state.email_1_error}
                            className="text_box"
                            name="email_1"
                            onChange={this.handleChange}
                            inputProps={{ maxLength: "100" }}
                            type="email"
                        />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
                        <Input
                            error={this.state.phone_number_1_error}
                            className="text_box"
                            name="phone_number_1"
                            type="number"
                            placeholder="09121111111"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="document_1">Documents</InputLabel>
                        <Input
                            error={this.state.document_1_error}
                            className="text_box"
                            name="document_1"
                            type="file"
                            placeholder="Your documents..."
                            onChange={this.handleFileChange}
                        />
                    </FormControl>
                    <FormControl margin="normal">
                        <div className="contestant_rule_checkbox">
                            <Checkbox
                                name="accept_share_info_1"
                                color="default"
                                onChange={this.handleShareInfoChange}
                            />
                            Do you allow us to share your information with our sponser <strong>Digikala</strong>?
                        </div>
                    </FormControl>
                </div>

                <div className="contestant_header_box">
                    <PersonIcon />
                    <h2 className="contestant_header">Contestant #2</h2>
                </div>
                <div className="contestant_box">
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="first_name">First Name</InputLabel>
                        <Input
                            error={this.state.first_name_2_error}
                            className="text_box"
                            name="first_name_2"
                            type="text"
                            onChange={this.handleChange}
                            inputProps={{ maxLength: "30" }}
                        />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="last_name">Last Name</InputLabel>
                        <Input
                            error={this.state.last_name_2_error}
                            className="text_box"
                            name="last_name_2"
                            type="text"
                            onChange={this.handleChange}
                            inputProps={{ maxLength: "30" }}
                        />
                    </FormControl>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select
                            error={this.state.gender_2_error}
                            className="text_box"
                            value={this.state.gender_2}
                            onChange={this.handleChange}
                            name="gender_2"
                        >
                            <MenuItem value={"M"}>Male</MenuItem>
                            <MenuItem value={"F"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="student_number">National ID</InputLabel>
                        <Input
                            error={this.state.student_number_2_error}
                            className="text_box"
                            type="number"
                            name="student_number_2"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="edu_level">Current Educational Level</InputLabel>
                        <Select
                            error={this.state.edu_level_2_error}
                            className="text_box"
                            value={this.state.edu_level_2}
                            onChange={this.handleChange}
                            name="edu_level_2"
                        >
                            <MenuItem value={"BSC"}>10th - High School</MenuItem>
                            <MenuItem value={"MSC"}>11th - High School</MenuItem>
                            <MenuItem value={"PHD"}>12th - High School</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            error={this.state.email_2_error}
                            className="text_box"
                            name="email_2"
                            onChange={this.handleChange}
                            inputProps={{ maxLength: "100" }}
                            type="email"
                        />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
                        <Input
                            error={this.state.phone_number_2_error}
                            className="text_box"
                            name="phone_number_2"
                            type="number"
                            placeholder="09121111111"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="document_2">Documents</InputLabel>
                        <Input
                            error={this.state.document_2_error}
                            className="text_box"
                            name="document_2"
                            type="file"
                            placeholder="Your documents..."
                            onChange={this.handleFileChange}
                        />
                    </FormControl>
                    <FormControl margin="normal">
                        <div className="contestant_rule_checkbox">
                            <Checkbox
                                name="accept_share_info_2"
                                color="default"
                                onChange={this.handleShareInfoChange}
                            />
                            Do you allow us to share your information with our sponser <strong>Digikala</strong>?
                        </div>
                    </FormControl>
                </div>

                <div className="contestant_header_box">
                    <PersonIcon />
                    <h2 className="contestant_header">Contestant #3</h2>
                </div>
                <div className="contestant_box">
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="first_name">First Name</InputLabel>
                        <Input
                            error={this.state.first_name_3_error}
                            className="text_box"
                            name="first_name_3"
                            type="text"
                            onChange={this.handleChange}
                            inputProps={{ maxLength: "30" }}
                        />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="last_name">Last Name</InputLabel>
                        <Input
                            error={this.state.last_name_3_error}
                            className="text_box"
                            name="last_name_3"
                            type="text"
                            onChange={this.handleChange}
                            inputProps={{ maxLength: "30" }}
                        />
                    </FormControl>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select
                            error={this.state.gender_3_error}
                            className="text_box"
                            value={this.state.gender_3}
                            onChange={this.handleChange}
                            name="gender_3"
                        >
                            <MenuItem value={"M"}>Male</MenuItem>
                            <MenuItem value={"F"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="student_number">National ID</InputLabel>
                        <Input
                            error={this.state.student_number_3_error}
                            className="text_box"
                            type="number"
                            name="student_number_3"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="edu_level">Current Educational Level</InputLabel>
                        <Select
                            error={this.state.edu_level_3_error}
                            className="text_box"
                            value={this.state.edu_level_3}
                            onChange={this.handleChange}
                            name="edu_level_3"
                        >
                            <MenuItem value={"BSC"}>10th - High School</MenuItem>
                            <MenuItem value={"MSC"}>11th - High School</MenuItem>
                            <MenuItem value={"PHD"}>12th - High School</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            error={this.state.email_3_error}
                            className="text_box"
                            name="email_3"
                            inputProps={{ maxLength: "100" }}
                            onChange={this.handleChange}
                            type="email"
                        />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
                        <Input
                            error={this.state.phone_number_3_error}
                            className="text_box"
                            name="phone_number_3"
                            type="number"
                            placeholder="09121111111"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="document_3">Documents</InputLabel>
                        <Input
                            error={this.state.document_3_error}
                            className="text_box"
                            name="document_3"
                            type="file"
                            placeholder="Your documents..."
                            onChange={this.handleFileChange}
                        />
                    </FormControl>
                    <FormControl margin="normal">
                        <div className="contestant_rule_checkbox">
                            <Checkbox
                                name="accept_share_info_3"
                                color="default"
                                onChange={this.handleShareInfoChange}
                            />
                            Do you allow us to share your information with our sponser <strong>Digikala</strong>?
                        </div>
                    </FormControl>
                </div>

                <Grid align="center">
                    <div className="contestant_rule_box">
                        <div className="contestant_rule_checkbox">
                            <Checkbox
                                name="rules"
                                color="default"
                                onChange={this.handleCheckboxChange}
                            />
                        </div>
                        <h4>
                            We have read and accepted&nbsp;
                            <a href="#"
                                style={{ fontFamily: "inherit", color: "#00b0ff" }}
                                onClick={this.OpenRegionalRules}
                            >
                                Regional Rules
                            </a>
                            &nbsp;and&nbsp;
                            <a href="#"
                                style={{ fontFamily: "inherit", color: "#00b0ff" }}
                                onClick={this.OpenLocalRules}
                            >
                                Local Rules
                            </a>.
                        </h4>
                        <Dialog
                            open={this.state.regional_rules}
                            onClose={this.CloseRegionalRules}
                        >
                            <DialogTitle>
                                {"Regional Rules"}
                            </DialogTitle>
                            <DialogContent>
                                <RegionalRules />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.CloseRegionalRules} color="default" autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                            open={this.state.local_rules}
                            onClose={this.CloseLocalRules}
                        >
                            <DialogTitle>
                                {"Amirkabir Local Contest Information and Rules"}
                            </DialogTitle>
                            <DialogContent>
                                <LocalRules />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.CloseLocalRules} color="default" autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <ReCAPTCHA
                        className="recaptcha"
                        sitekey="6LfEJgkUAAAAAOVMfzDA_6E2Mw4jMtjYadVy5upA"
                        onChange={this.onChange}
                    />
                    <Button
                        style={{ fontFamily: "inherit", marginTop: "20px" }}
                        color="primary"
                        variant="contained"
                        className="submit_button"
                        type="submit"
                        onClick={this.onSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </form>
        )
    }
}

export default Register