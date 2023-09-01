import React, { useDebugValue, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useImmer } from "use-immer";
import html2canvas from "html2canvas";
import "./form.css";
import axios from "axios";
import { uploadDirect } from "@uploadcare/upload-client";
const Form = () => {
  const [errorState, setErrorState] = useState(null);
  const [response,setResponse]=useState(false)
  const [data, setData] = useImmer({
    email: {
      question: "Email",
      value: "",
    },
    name: {
      question: "Full Name",
      value: "",
    },
    age: {
      question: "Age",
      value: "",
    },
    education: {
      question: "Highest Level of Education?",
      value: "",
    },
    institute: {
      question:
        "Institute where you completed your highest level of education?",
      value: "",
    },
    field: {
      question: "What did you study",
      value: "",
    },
    experience: {
      question: "Do you have any relevant work experience?",
      value: "",
    },
    institute_canada: {
      question: "What institute did you get admitted to in Canada?",
      value: "",
    },
    program: {
      question: "What is your program of study in Canada?",
      value: "",
    },
    country: {
      question: "Which country are you applying from?",
      value: "",
    },
    future: {
      question: "What are your future goals?",
      value: "",
    },
    listening: {
      question: "English Scores - Listening",
      value: "",
    },
    writing: {
      question: "English Scores - Writing",
      value: "",
    },
    reading: {
      question: "English Scores - Reading",
      value: "",
    },
    speaking: {
      question: "English Scores - Speaking",
      value: "",
    },
    tution_fee: {
      question: "Did you pay your first year tuition?",
      value: "",
    },
    actual_fee: {
      question: "How much tuition fee did you pay?",
      value: "",
    },
    gic: {
      question: "Did you do a GIC?",
      value: "",
    },
    gic_amount: {
      question: "How much did you pay towards GIC?",
      value: "",
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age") {
      if (isNaN(value)) return;
    }
    setData((state) => {
      state[name]["value"] = value;
    });
  };
  const handleSubmit = async () => {
    let keys=Object.keys(data)
    let error=false
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (data[key]['value']==='' ||data[key]['value']===0 ) {
            setErrorState(key)
            error=true
            return
        }
        
    }
    console.log('fffffff');
    if (error) {
        return
    }
    html2canvas(document.querySelector("#form1"), {
      scrollY: -window.screenY,
    }).then((canvas) => {
      // document.body.appendChild(canvas);
      canvas.toBlob((blob) => {
        uploadDirect(blob, {
          publicKey: "220796683a39cf17d2cc",
          store: "auto",
        }).then((res) => {
          console.log(res?.uuid);
          let url = `https://ucarecdn.com/${res?.uuid}/`;
          axios
            .post("https://form-k87d.onrender.com/submit-form", {
              name: data['name']?.value,
              email: data['email']?.value,
              feedback: url,
            })
            .then((res) => {
              console.log({ res });
              setResponse(true)
            });
        });
      });
      // Send imgData through email...
    });
  };

  return (
    <div className="form" id="form1">
        {response ? 'Thank you for response your response has been recorded and an copy of response has been sent to your email' : <>
    <h1>Foofle Gorm</h1>
      <div className="form_field">
        <TextField
          required
          name="email"
          onChange={handleChange}
          error={errorState === "email"}
          id="email"
          label={data["email"]?.question}
          fullWidth
          size="large"
          value={data["email"]?.value}
          helperText=""
        />
      </div>
      <div className="form_field">
        <TextField
          onChange={handleChange}
          name="name"
          error={errorState === "name"}
          id="name"
          required
          label={data["name"]?.question}
          fullWidth
          size="large"
          value={data["name"]?.value}
        />
      </div>
      <div className="form_field">
        <TextField
          required
          onChange={handleChange}
          name="age"
          autoFocus={errorState === "age"}
          error={errorState === "age"}
          id="age"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label={data["age"]?.question}
          fullWidth
          size="large"
          value={data["age"]?.value}
        />
      </div>
      <div className="form_field">
        <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">
            {data["education"]?.question}
          </InputLabel>
          <Select
            required
            name="education"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={data["education"]?.answer}
            label="education"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={""}>Choose</MenuItem>
            <MenuItem value={"Grade 10"}>Grade 10</MenuItem>
            <MenuItem value={"Diploma"}>Diploma</MenuItem>
            <MenuItem value={"Bachelors"}>Bachelor's</MenuItem>
            <MenuItem value={"Masters"}>Master's</MenuItem>
            <MenuItem value={"PHD"}>PHD</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="form_field">
        <TextField
          required
          name="institute"
          error={errorState === "institute"}
          id="institute"
          label={data["institute"]?.question}
          fullWidth
          size="large"
          onChange={handleChange}
          value={data["institute"]?.value}
        />
      </div>
      <div className="form_field">
        <TextField
          required
          name="field"
          error={errorState === "field"}
          id="age"
          label={data["field"]?.question}
          fullWidth
          size="large"
          onChange={handleChange}
          value={data["field"]?.value}
        />
      </div>
      <div className="form_field">
        <TextField
          required
          name="experience"
          error={errorState === "experience"}
          id="age"
          label={data["experience"]?.question}
          fullWidth
          size="large"
          onChange={handleChange}
          value={data["experience"]?.value}
        />
      </div>
      <div className="form_field">
        <TextField
          required
          name="institute_canada"
          error={errorState === "institute_canada"}
          id="age"
          label={data["institute_canada"]?.question}
          fullWidth
          size="large"
          onChange={handleChange}
          value={data["institute_canada"]?.value}
        />
      </div>
      <div className="form_field">
        <TextField
          required
          name="program"
          error={errorState === "program"}
          id="age"
          label={data["program"]?.question}
          fullWidth
          size="large"
          onChange={handleChange}
          value={data["program"]?.value}
        />
      </div>
      <div className="form_field">
        <TextField
          required
          name="country"
          error={errorState === "country"}
          id="age"
          label={data["country"]?.question}
          fullWidth
          size="large"
          onChange={handleChange}
          value={data["country"]?.value}
        />
      </div>
      <div className="form_field">
        <TextField
          required
          name="future"
          error={errorState === "future"}
          id="age"
          label={data["future"]?.question}
          fullWidth
          size="large"
          onChange={handleChange}
          value={data["future"]?.value}
        />
      </div>
      <div className="form_field">
        <TextField
          name="listening"
          required
          error={errorState === "listening"}
          id="age"
          label={data["listening"]?.question}
          fullWidth
          size="large"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={handleChange}
          value={data["listening"]?.value}
        />
      </div>
      <div className="form_field">
        <TextField
          name="speaking"
          required
          error={errorState === "speaking"}
          id="age"
          label={data["speaking"]?.question}
          fullWidth
          size="large"
          onChange={handleChange}
          value={data["speaking"]?.value}
        />
      </div>
      <div className="form_field">
        <TextField
          required
          name="writing"
          error={errorState === "writing"}
          id="age"
          label={data["writing"]?.question}
          fullWidth
          size="large"
          onChange={handleChange}
          value={data["writing"]?.value}
        />
      </div>
      <div className="form_field">
        <TextField
          required
          name="reading"
          error={errorState === "reading"}
          id="age"
          onChange={handleChange}
          label={data["reading"]?.question}
          fullWidth
          size="large"
          value={data["reading"]?.value}
        />
      </div>

      <div className="form_field">
        <FormControl fullWidth>
          <FormLabel id="demo-controlled-radio-buttons-group">
            {data["tution_fee"]?.question}*
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="tution_fee"
            value={data["tution_fee"]?.value}
            onChange={handleChange}
            //value={value}
            //onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="form_field">
        <TextField
          error={errorState === "actual_fee"}
          id="age"
          required
          name="actual_fee"
          label={data["actual_fee"]?.question}
          fullWidth
          size="large"
          value={data["actual_fee"]?.value}
          onChange={handleChange}
        />
      </div>
      <div className="form_field">
        <FormControl fullWidth>
          <FormLabel id="demo-controlled-radio-buttons-group">
            {data["gic"]?.question}*
          </FormLabel>
          <RadioGroup
            required
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="gic"
            value={data["gic"]?.value}
            //value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="form_field">
        <TextField
          required
          name="gic_amount"
          error={errorState === "gic_amount"}
          id="age"
          label={data["gic_amount"]?.question}
          fullWidth
          size="large"
          value={data["gic_amount"]?.value}
          onChange={handleChange}
        />
      </div>
      <Button variant="contained" onClick={handleSubmit} >
        Submit
      </Button>
    </> }
   
     

      
    </div>
  );
};

export default Form;
