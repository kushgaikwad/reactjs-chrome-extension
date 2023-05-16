/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import SummaryCard from "../components/SummaryCard";


describe("SummaryCard", () => {

    const testingShortSummary = "This is a text for testing";
    const testingSLongSummary = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


    it("should render the summary card with small test which is shown in main plugin screen without 'Read More test'", async () => {
        render(<SummaryCard summary={testingShortSummary} />);
        const button = screen.queryByRole('button');
        expect(button).toBeNull();
    });

    it("should render the summary card with small test which is shown in main plugin screen without 'Read More test'", async () => {
        render(<SummaryCard summary={testingSLongSummary} />);
        screen.getByText('Read More')
    });

});