import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";
import { Markup } from 'interweave';

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ label,data }) {
  const classes = useStyles();
  var keys = label.map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell align={"center"} key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({  _source, good_summary, _score },index) => (
          <TableRow key={index}>
             <TableCell align="center" className="pl-3 fw-normal">{index+1}</TableCell>
            <TableCell align="center" className="pl-3 fw-normal">{_source.file.filename}</TableCell>
            <TableCell  align="center">{_source.path.real}
        { /*  <Chip label={_score} classes={{root: classes["info"]}}/> */ }
            </TableCell>
            <TableCell >
            <Markup content= {good_summary} /> 
            </TableCell>
            <TableCell align="center" >
              <Chip label={_score} classes={{root: classes[states["sent"]]}}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
