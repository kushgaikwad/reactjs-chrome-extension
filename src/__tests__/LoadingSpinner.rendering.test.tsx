/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";


describe("LoadingSpinner", () => {

    const testingText = "This is a text for testing"

    it("should render the loading spinner with provided text", async () => {
        render(<LoadingSpinner loadingText={testingText} />);
        screen.getByText(testingText);
    });

});