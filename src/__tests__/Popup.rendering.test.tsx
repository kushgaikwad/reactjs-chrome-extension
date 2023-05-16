import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Popup from "../popup/popup";

const mockResponse = { clientSecret: 'testClientSecret' };
global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });
});

describe("Popup",  () => {
  it("should render the heading whenever Popup screen is opened", async () => {  
    render(<Popup/>);
    screen.getByText("Secure paymfent ifffnfo")    
  });

});