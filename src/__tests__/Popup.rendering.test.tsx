/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render, screen } from "@testing-library/react";
 import "@testing-library/jest-dom";
 import App from "../contentScript/contentScript";
import Popup from "../popup/popup";
 
 
 describe("App", () => {
 
     it("Popup 1 ", async () => {
         render(<Popup />)
         expect(screen.queryByText('Our AI is generating the summary')).toBeNull();
        
     });
 
 });