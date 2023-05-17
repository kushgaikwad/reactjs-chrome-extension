/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Popup from "../popup/popup";


describe("App", () => {

    it("Rendering the popup screen should not render the the  ", async () => {
        render(<Popup />)
        screen.getByText('Frontdoor Smart Summary');

    });

});