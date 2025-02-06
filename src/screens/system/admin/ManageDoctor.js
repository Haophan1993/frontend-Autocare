import './ManageDoctor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../../../components/Header';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import * as React from "react";
import ReactMde from "react-mde";
import ReactDOM from "react-dom";
import * as Showdown from "showdown";










const ManageDoctor = () => {

    const [value, setValue] = React.useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = React.useState("write");

    const navigate = useNavigate();

    function loadSuggestions(text) {
        return new Promise((accept, reject) => {
            setTimeout(() => {
                const suggestions = [
                    {
                        preview: "Andre",
                        value: "@andre"
                    },
                    {
                        preview: "Angela",
                        value: "@angela"
                    },
                    {
                        preview: "David",
                        value: "@david"
                    },
                    {
                        preview: "Louise",
                        value: "@louise"
                    }
                ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
                accept(suggestions);
            }, 250);
        });
    }

      const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
      });












    return (


        <>
            <Header />

            <div className="container">
                <ReactMde
                    value={value}
                    onChange={setValue}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                    loadSuggestions={loadSuggestions}
                    childProps={{
                        writeButton: {
                            tabIndex: -1
                        }
                    }}
                />
            </div>

        </>

    )
}

export default ManageDoctor