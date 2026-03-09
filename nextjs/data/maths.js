// Complete DPP data extracted from index.html
const maths = [
  {
    id: 1,
    title: "DPP 1: Logic, Satisfiability & Quantifiers",
    type: "mcq",
    description: "Satisfiability, Sudoku Modeling, Rules of Inference, and Quantifier logic (20 Qs)",
    questions: [
      { q: "A compound proposition is 'Unsatisfiable' if:", a: ["It is true for at least one assignment of truth values.", "It is true for all assignments of truth values.", "It is false for all assignments of truth values.", "Its negation is a contradiction."], correct: 2, expl: "Unsatisfiable means there is no scenario (no truth assignment) where the statement evaluates to True." },
      { q: "Evaluate the satisfiability of: $(p \\leftrightarrow q) \\land (\\neg p \\leftrightarrow q)$", a: ["Tautology", "Satisfiable but not a tautology", "Unsatisfiable", "Valid"], correct: 2, expl: "The first clause requires p and q to have the same truth value. The second requires $\\neg p$ and q to have the same truth value. Both cannot be true simultaneously." },
      { q: "Evaluate the satisfiability of: $(p \\to q) \\land (p \\to \\neg q) \\land (\\neg p \\to q) \\land (\\neg p \\to \\neg q)$", a: ["Tautology", "Satisfiable", "Unsatisfiable", "Contingency"], correct: 2, expl: "If p is True, it implies both q and $\\neg q$ (a contradiction). If p is False, $\\neg p$ is True, which also implies both q and $\\neg q$ (contradiction)." },
      { q: "If a SAT solver determines that the negation of your proposition ($\\neg P$) is UNSAT, what does that logically mean for the original proposition $P$?", a: ["$P$ is a contradiction.", "$P$ is a tautology (valid).", "$P$ is satisfiable but not valid.", "$P$ cannot be evaluated."], correct: 1, expl: "If it is impossible for $\\neg P$ to be true, then P must be true under all possible assignments." },
      { q: "Which of these is a 'Vacuously True' statement?", a: ["All even prime numbers greater than 2 are divisible by 5.", "There exists a number that is not equal to itself.", "1 + 1 = 2.", "If 1 + 1 = 3, then I am a robot."], correct: 3, expl: "An implication $P \\to Q$ is automatically (vacuously) true if the premise P is false. '1+1=3' is false, making the whole statement true." },
      { q: "Query A is \"java AND program AND NOT computer\". Query B is \"(computer OR algorithm) AND java\". What kind of web page would be returned by Query A but NOT by Query B?", a: ["A page containing only \"java\" and \"computer\".", "A page containing \"java\", \"program\", but lacking \"computer\" and \"algorithm\".", "A page containing \"java\", \"program\", and \"algorithm\".", "A page containing \"program\" and \"computer\"."], correct: 1, expl: "Query A requires \"java\", \"program\", and NO \"computer\". To fail Query B, the page must also NOT contain \"algorithm\" (since it already contains \"java\")." },
      { q: "Query C is \"java AND NOT (computer OR algorithm OR program)\". Applying DeMorgan's Law, a page returned by this query MUST:", a: ["Contain \"java\" and at least one of the other three words.", "Contain \"java\" and exactly one of the other three words.", "Contain \"java\", but NOT contain \"computer\", NOT contain \"algorithm\", and NOT contain \"program\".", "Not contain \"java\"."], correct: 2, expl: "NOT (A OR B OR C) is logically equivalent to NOT A AND NOT B AND NOT C." },
      { q: "Consider the query: \"python AND (list OR NOT tuple)\". Which of the following pages will NOT be returned?", a: ["A page with \"python\" and \"list\" and \"tuple\".", "A page with \"python\" and \"tuple\" but no \"list\".", "A page with \"python\" and no \"list\" and no \"tuple\".", "A page with \"python\" and \"list\" but no \"tuple\"."], correct: 1, expl: "The page has \"python\" (True). It has \"tuple\" (NOT tuple is False) and no \"list\" (False). So (list OR NOT tuple) evaluates to False OR False = False." }
    ]
  },
  {
    id: 2,
    title: "DPP 2: Boolean Logic & Predicates",
    type: "mcq",
    description: "Boolean Simplification, K-maps, Logic Gates, CNF/DNF, and Predicate Modeling (25 Qs)",
    questions: [
      { q: "Simplify the Boolean function $F(x,y) = \\overline{\\overline{x}} + y$.", a: ["$x + y$", "$\\overline{x} + y$", "$xy$", "1"], correct: 0, expl: "By the double negation law, $\\overline{\\overline{x}} = x$. Thus the expression simplifies directly to $x + y$." },
      { q: "What is the canonical Sum-of-Products (minterm) expansion of $F(x,y) = x$ over variables $x$ and $y$?", a: ["$x$", "$xy + x\\overline{y}$", "$x + y$", "$xy$"], correct: 1, expl: "To include the missing variable $y$, we multiply by $(y + \\overline{y}) = 1$. So, $x(y + \\overline{y}) = xy + x\\overline{y}$." },
      { q: "What is the canonical Sum-of-Products expansion of $F(x,y) = 1$ over variables $x$ and $y$?", a: ["$xy$", "$x + y$", "$xy + x\\overline{y} + \\overline{x}y + \\overline{x}\\overline{y}$", "$0$"], correct: 2, expl: "A function that is always 1 includes every possible minterm for the given variables to cover all truth table rows." },
      { q: "A Boolean function represented as a Boolean product of maxterms is called:", a: ["Disjunctive Normal Form (DNF)", "Conjunctive Normal Form (CNF)", "Sum of Products (SOP)", "K-map"], correct: 1, expl: "Product-of-sums (POS) or a product of maxterms is also formally known as Conjunctive Normal Form (CNF)." },
      { q: "In a 3-variable Karnaugh Map (K-map), how many cells are present?", a: ["4", "6", "8", "16"], correct: 2, expl: "A K-map for $n$ variables has $2^n$ cells. For 3 variables ($x, y, z$), $2^3 = 8$." }
    ]
  },
  {
    id: 3,
    title: "DPP 3: Logical Arguments & Inference",
    type: "mcq", 
    description: "Multi-Premise Arguments, Rules of Inference, Modus Ponens & Modus Tollens (10 Qs)",
    questions: [
      { q: "Given the following premises:<br>P1: The research will not be completed on time.<br>P2: If the project is funded, then we will buy new equipment.<br>P3: If we buy new equipment, then the research will be completed on time.<br>P4: The grant is not renewed or the project is funded.<br><br>What valid conclusion can be drawn?", a: ["We will buy new equipment.", "The project is funded.", "The grant is not renewed.", "The grant is renewed."], correct: 2, expl: "Let C = completed, F = funded, E = equipment, G = grant renewed. P1: $\\neg C$. P3: $E \\to C$, so by Modus Tollens, $\\neg E$. P2: $F \\to E$, so by Modus Tollens, $\\neg F$. P4: $\\neg G \\lor F$, and since $\\neg F$, by Disjunctive Syllogism, $\\neg G$ (grant is not renewed)." }
    ]
  },
  {
    id: 4,
    title: "DPP 4: Set Theory & Venn Diagrams",
    type: "mcq",
    description: "Max-Min intersections, extreme constraints, and exact group limits (10 Qs)",
    questions: [
      { q: "In a class of 100 students:<br>70 study Mathematics<br>75 study Physics<br>80 study Chemistry<br><br>Find the minimum possible number of students who study all three subjects.", a: ["15", "20", "25", "30"], correct: 2, expl: "Using the formula for the minimum intersection of three sets: $\\max(0, n(A) + n(B) + n(C) - 2N)$. Here, it is $70 + 75 + 80 - 2(100) = 225 - 200 = 25$." }
    ]
  },
  {
    id: 5,
    title: "DPP 5: Advanced Set Theory & Cardinality", 
    type: "mcq",
    description: "Basic Set Logic, Inclusion-Exclusion, Countability, and Infinite Intersections (50 Qs)",
    questions: [
      { q: "Let $\\emptyset$ denote the empty set. Consider the following statements about $\\emptyset$ and the set $\\{\\emptyset\\}$. Which of the following is TRUE?", a: ["$\\emptyset \\in \\emptyset$", "$\\emptyset \\subseteq \\emptyset$", "$\\emptyset \\subset \\emptyset$", "$\\{\\emptyset\\} \\subset \\emptyset$"], correct: 1, expl: "The empty set is a subset of every set, including itself, making $\\emptyset \\subseteq \\emptyset$ true." }
    ]
  },
  {
    id: 6,
    title: "DPP 6: Proofs & Translations",
    type: "subjective", 
    description: "Subjective step-by-step proofs, logic translations, and binary arithmetic propositions (20 Qs)",
    questions: [
      { q: "Consider a number $x \\in \\{0, \\dots, 15\\}$ represented as a 4-bit binary number with bits $x_3, x_2, x_1, x_0$ where $x_0$ is the least-significant bit. Give a proposition over these variables that expresses:<br><br><b>(a) $x \\ge 8$</b><br><b>(b) $x$ is evenly divisible by 4</b><br><b>(c) $x$ is evenly divisible by 5</b>", expl: `<b>(a) $x \\ge 8$</b><br>Concept: In 4-bit binary, numbers $\\ge 8$ have MSB = 1. Examples: 8 (1000), 9 (1001), 15 (1111).<br>Proposition: $x_3$<br><br><b>(b) $x$ is divisible by 4</b><br>Concept: Multiples of 4 are 0 (0000), 4 (0100), 8 (1000), 12 (1100). The last two bits must be 0.<br>Proposition: $\\neg x_1 \\land \\neg x_0$<br><br><b>(c) $x$ is divisible by 5</b><br>Multiples of 5 in range 0–15: 0 (0000), 5 (0101), 10 (1010), 15 (1111).<br>Proposition (OR of all cases):<br>$(\\neg x_3 \\land \\neg x_2 \\land \\neg x_1 \\land \\neg x_0) \\lor$<br>$(\\neg x_3 \\land x_2 \\land \\neg x_1 \\land x_0) \\lor$<br>$(x_3 \\land \\neg x_2 \\land x_1 \\land \\neg x_0) \\lor$<br>$(x_3 \\land x_2 \\land x_1 \\land x_0)$` }
    ]
  },
  {
    id: 7,
    title: "DPP 7: Mixed Logic & Proofs",
    type: "subjective",
    description: "Mixed subjective practice on K-maps, Sudoku SAT, quantifiers, and mathematical proofs (12 Qs)", 
    questions: [
      { q: "Let the domain be the set of all integers. Express the following statements symbolically:<br><br><b>(a)</b> Every integer has an additive inverse.<br><b>(b)</b> There exists an integer that is divisible by every integer.<br><b>(c)</b> Not every integer is positive.", expl: `<b>(a) Every integer has an additive inverse</b><br>For every integer $x$, there exists an integer $y$ such that their sum is zero.<br>$\\forall x \\, \\exists y \\, (x + y = 0)$<br><br><b>(b) There exists an integer divisible by every integer</b><br>$\\exists x \\, \\forall y \\, (y \\mid x)$<br>Meaning: there exists an integer $x$ such that every integer $y$ divides $x$.<br><br><b>(c) Not every integer is positive</b><br>$\\neg \\forall x (x > 0)$<br>Equivalent form: $\\exists x (x \\le 0)$` }
    ]
  },
  {
    id: 8,
    title: "DPP 8: Countability & Functions",
    type: "subjective",
    description: "Hilbert's Hotel, countable vs uncountable sets, bijections, and the Mapping Rule (9 Qs)",
    questions: [
      { q: "Determine whether each of these sets is finite or countably infinite. For those that are countably infinite, exhibit a one-to-one correspondence between the set of positive integers and that set.<br><br><b>(a)</b> the negative integers<br><b>(b)</b> the even integers<br><b>(c)</b> the integers less than 100<br><b>(d)</b> the positive integers less than 1,000,000,000<br><b>(e)</b> the integers that are multiples of 7", expl: `<b>(a) The negative integers</b><br>Set: $\\{-1,-2,-3,-4,\\dots\\}$. This set never ends $\\rightarrow$ infinite.<br>Define mapping: $f(n) = -n$<br>This mapping pairs every positive integer with one negative integer. Conclusion: Countably infinite.<br><br><b>(b) The even integers</b><br>Set: $\\{2,4,6,8,\\dots\\}$.<br>Define mapping: $f(n) = 2n$<br>Each positive integer maps to exactly one even integer. Conclusion: Countably infinite.<br><br><b>(c) Integers less than 100</b><br>Set: $\\{\\dots, -2,-1,0,1,2,\\dots,99\\}$. This set is infinite in the negative direction.<br>We can map: $1 \\rightarrow 99, 2 \\rightarrow 98, 3 \\rightarrow 97$, i.e., $f(n) = 100 - n$.<br>Conclusion: Countably infinite.<br><br><b>(d) Positive integers less than 1,000,000,000</b><br>Set: $\\{1,2,3,\\dots,999999999\\}$. This set has a largest element.<br>Number of elements: 999,999,999.<br>Conclusion: Finite.<br><br><b>(e) Integers that are multiples of 7</b><br>Set: $\\{7,14,21,28,\\dots\\}$.<br>Define mapping: $f(n) = 7n$<br>Conclusion: Countably infinite.` }
    ]
  }
];

export default maths;
