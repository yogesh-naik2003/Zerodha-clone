import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import NotFound from "../NotFound";
import OpenAccount from "../OpenAccount";
import HomePage from "../home/HomePage";
import HomeHero from "../home/Hero";
import Awards from "../home/Awards";
import Stats from "../home/Stats";
import HomePricing from "../home/Pricing";
import Education from "../home/Education";
import AboutPage from "../about/AboutPage";
import AboutHero from "../about/Hero";
import Team from "../about/Team";
import PricingPage from "../pricing/PricingPge";
import PricingHero from "../pricing/Hero";
import Brokerage from "../pricing/Brokerage";
import ProductsPage from "../product/ProductsPage";
import ProductHero from "../product/Hero";
import LeftSection from "../product/LeftSection";
import RightSection from "../product/RightSection";
import Universe from "../product/Universe";
import SupportPage from "../support/SupportPage";
import SupportHero from "../support/Hero";
import CreateTicket from "../support/CreateTicket";
import Signup from "../signup/Signup";
import Login from "../login/Login";

jest.mock(
  "react-router-dom",
  () => ({
    Link: ({ to, children, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  }),
  { virtual: true }
);

const renderWithRouter = (ui) => render(ui);

describe("Shared landing components", () => {
  test("renders navbar links", () => {
    renderWithRouter(<Navbar />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /signup/i })).toHaveAttribute(
      "href",
      "/signup"
    );
    expect(screen.getByRole("link", { name: /login/i })).toHaveAttribute(
      "href",
      "/login"
    );
    expect(screen.getByRole("link", { name: /support/i })).toHaveAttribute(
      "href",
      "/support"
    );
  });

  test("renders footer sections", () => {
    render(<Footer />);

    expect(screen.getByText(/not zerodha broking ltd/i)).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
  });

  test("renders open account call to action", () => {
    render(<OpenAccount />);

    expect(screen.getByRole("heading", { name: /open a zerodha account/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up now/i })).toBeInTheDocument();
  });

  test("renders not found page", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: /404 not found/i })).toBeInTheDocument();
    expect(screen.getByText(/page you are looking for does not exist/i)).toBeInTheDocument();
  });
});

describe("Home page components", () => {
  test("renders home hero", () => {
    render(<HomeHero />);

    expect(screen.getByAltText("Investment platform dashboard")).toHaveAttribute(
      "src",
      "Media/homeHero.png"
    );
    expect(screen.getByRole("heading", { name: /invest in everything/i })).toBeInTheDocument();
  });

  test("renders awards section", () => {
    render(<Awards />);

    expect(screen.getByRole("heading", { name: /largest stock broker in india/i })).toBeInTheDocument();
    expect(screen.getByText(/futures and options/i)).toBeInTheDocument();
    expect(screen.getByText(/stocks & ipos/i)).toBeInTheDocument();
  });

  test("renders stats section", () => {
    render(<Stats />);

    expect(screen.getByRole("heading", { name: /trust with confidence/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /customer-first always/i })).toBeInTheDocument();
    expect(screen.getByText(/the zerodha universe/i)).toBeInTheDocument();
  });

  test("renders pricing summary section", () => {
    render(<HomePricing />);

    expect(screen.getByRole("heading", { name: /unbeatable pricing/i })).toBeInTheDocument();
    expect(screen.getByText(/free equity delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/intraday and f&o/i)).toBeInTheDocument();
  });

  test("renders education section", () => {
    render(<Education />);

    expect(screen.getByRole("heading", { name: /free and open market education/i })).toBeInTheDocument();
    expect(screen.getByText(/varsity, the largest online stock market education book/i)).toBeInTheDocument();
    expect(screen.getAllByText(/tradingq&a/i).length).toBeGreaterThan(1);
  });

  test("renders composed home page", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /invest in everything/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /open a zerodha account/i })).toBeInTheDocument();
  });
});

describe("About page components", () => {
  test("renders about hero", () => {
    render(<AboutHero />);

    expect(screen.getByText(/we pioneered the discount broking model in india/i)).toBeInTheDocument();
    expect(screen.getByText(/15th of august, 2010/i)).toBeInTheDocument();
  });

  test("renders team section", () => {
    render(<Team />);

    expect(screen.getByRole("heading", { name: /people/i })).toBeInTheDocument();
    expect(screen.getByText(/nithin kamath/i)).toBeInTheDocument();
    expect(screen.getByText(/founder, ceo/i)).toBeInTheDocument();
  });

  test("renders composed about page", () => {
    render(<AboutPage />);

    expect(screen.getByText(/we pioneered the discount broking model in india/i)).toBeInTheDocument();
    expect(screen.getByText(/nithin kamath/i)).toBeInTheDocument();
  });
});

describe("Pricing page components", () => {
  test("renders pricing hero", () => {
    render(<PricingHero />);

    expect(screen.getByRole("heading", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /free equity delivery/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /free direct mf/i })).toBeInTheDocument();
  });

  test("renders brokerage section", () => {
    render(<Brokerage />);

    expect(screen.getByRole("heading", { name: /brokerage calculator/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /list of charges/i })).toBeInTheDocument();
  });

  test("renders composed pricing page", () => {
    render(<PricingPage />);

    expect(screen.getByRole("heading", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /open a zerodha account/i })).toBeInTheDocument();
  });
});

describe("Product page components", () => {
  test("renders product hero", () => {
    render(<ProductHero />);

    expect(screen.getByRole("heading", { name: /technology/i })).toBeInTheDocument();
    expect(screen.getByText(/sleek, modern and intuitive trading platforms/i)).toBeInTheDocument();
  });

  test("renders left section with props", () => {
    render(
      <LeftSection
        imageURL="Media/kite.png"
        productName="Kite"
        productDesription="Trading platform"
        tryDemo="/demo"
        learnMore="/learn"
        googlePlay="/play"
        appStore="/app-store"
      />
    );

    expect(screen.getByRole("heading", { name: /^kite$/i })).toBeInTheDocument();
    expect(screen.getByText(/trading platform/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /try demo/i })).toHaveAttribute("href", "/demo");
  });

  test("renders right section with props", () => {
    render(
      <RightSection
        imageURL="Media/console.png"
        productName="Console"
        productDesription="Reports dashboard"
        learnMore="/console"
      />
    );

    expect(screen.getByRole("heading", { name: /console/i })).toBeInTheDocument();
    expect(screen.getByText(/reports dashboard/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /learn more/i })).toHaveAttribute("href", "/console");
  });

  test("renders universe section", () => {
    render(<Universe />);

    expect(screen.getByRole("heading", { name: /the zerodha universe/i })).toBeInTheDocument();
    expect(screen.getAllByText(/thematic investment platform/i)).toHaveLength(6);
    expect(screen.getByRole("button", { name: /signup now/i })).toBeInTheDocument();
  });

  test("renders composed products page", () => {
    render(<ProductsPage />);

    expect(screen.getByRole("heading", { name: /technology/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^kite$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /console/i })).toBeInTheDocument();
  });
});

describe("Support page components", () => {
  test("renders support hero", () => {
    render(<SupportHero />);

    expect(screen.getByText(/support portal/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/how do i activate f&o/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /featured/i })).toBeInTheDocument();
  });

  test("renders ticket topics", () => {
    render(<CreateTicket />);

    expect(
      screen.getByRole("heading", {
        name: /^to create a ticket, select a relevant topic$/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/account opening/i).length).toBeGreaterThan(1);
    expect(screen.getAllByText(/online account opening/i).length).toBeGreaterThan(1);
  });

  test("renders composed support page", () => {
    render(<SupportPage />);

    expect(screen.getByText(/support portal/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /^to create a ticket, select a relevant topic$/i,
      })
    ).toBeInTheDocument();
  });
});

describe("Auth pages", () => {
  test("renders signup form", () => {
    renderWithRouter(<Signup />);

    expect(screen.getByRole("heading", { name: /signup account/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toHaveAttribute("href", "/login");
  });

  test("renders login form", () => {
    renderWithRouter(<Login />);

    expect(screen.getByRole("heading", { name: /login account/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /signup/i })).toHaveAttribute("href", "/signup");
  });
});
