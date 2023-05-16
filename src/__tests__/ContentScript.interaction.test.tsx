/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../contentScript/contentScript";


describe("App", () => {

    it("Content script should not show the loader element without any activity", async () => {
        render(<App />)
        expect(screen.queryByText('Our AI is generating the summary')).toBeNull();
       
    });

});