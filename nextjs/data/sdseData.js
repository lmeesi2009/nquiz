export const sdseData = [
  {
    id: 'sdse-1',
    title: 'SDSE DPP 1: Software Engineering',
    type: 'mcq',
    description: 'Software lifecycle, maintenance, quality attributes, and the importance of design.',
    questions: [
      {
        q: 'If a development team skips the design phase and proceeds directly from requirements to coding, what is the most likely consequence?',
        a: ['Faster delivery with no impact on quality.', 'Reduced number of bugs during implementation.', 'Architecture and maintenance problems later on.', 'Elimination of the testing phase.'],
        correct: 2,
        expl: 'Skipping the design phase typically causes architecture issues and makes future maintenance much harder. The system may work initially, but lack of design leads to complex, unstructured code and problems down the line.'
      },
      {
        q: 'After initial release, the development team spends most of their time fixing bugs and adding new features. Which phase of the software lifecycle does this describe?',
        a: ['Design', 'Testing', 'Deployment', 'Maintenance'],
        correct: 3,
        expl: 'The maintenance phase involves fixing bugs and evolving the software after deployment. Design and testing happen before release, so ongoing bug fixes and enhancements indicate maintenance.'
      },
      {
        q: 'A software product is completely bug-free (100% correct), but developers find it extremely difficult to change or extend. How should this product be judged in terms of success?',
        a: ['Successful, because correctness is all that matters.', 'Successful, because passing tests means a good product.', 'Failed, because maintainability is poor.', 'Failed, because it lacks user documentation.'],
        correct: 2,
        expl: 'Correctness (bug-free) is not enough for a successful system. If the code is hard to update, maintainability is poor and the system is considered an engineering failure. Good software needs both correctness and key qualities like maintainability.'
      },
      {
        q: 'Messy, unorganized code in a software project most directly affects which quality attribute?',
        a: ['Reliability', 'Maintainability', 'Testability', 'Durability'],
        correct: 1,
        expl: 'Messy code makes it harder for developers to understand and modify the system, directly reducing maintainability. Reliability and testability may suffer indirectly, but maintainability is most impacted.'
      },
      {
        q: 'In system design, which quality attribute ensures that the system continues to operate correctly even if some components fail?',
        a: ['Observability', 'Reliability', 'Scalability', 'Encapsulation'],
        correct: 1,
        expl: 'Reliability means the system keeps functioning correctly even in the face of failures in hardware, software, or human error. It is crucial for high-availability systems that must run 24/7.'
      },
      {
        q: 'Which statement best reflects the relationship between correctness (working code) and quality attributes?',
        a: ['Working code is enough; quality attributes are optional.', 'Quality attributes like reliability and maintainability determine success beyond just correct code.', 'Quality attributes are the same as code correctness.', 'Quality attributes only matter after the first year of maintenance.'],
        correct: 1,
        expl: 'A system can be correct (bug-free) yet still be a bad engineering choice if it fails important quality attributes. Working code is the baseline, but quality decides success or failure.'
      },
      {
        q: 'During the design of an online shopping app, the team identifies modules like Cart, Payment, and Product. This activity corresponds to which part of the software lifecycle?',
        a: ['Requirement gathering', 'Design phase', 'Testing phase', 'Deployment phase'],
        correct: 1,
        expl: 'Identifying system modules (Cart, Payment, Product, etc.) is part of the design phase, where the system’s structure and components are planned.'
      },
      {
        q: 'What is the correct next phase in the lifecycle after coding is completed?',
        a: ['Deploy', 'Test', 'Maintain', 'Design'],
        correct: 1,
        expl: 'After coding, the next phase is testing, where the code is checked for errors before deployment. Deployment and maintenance come after successful testing.'
      },
      {
        q: 'Which of the following is NOT a software quality attribute?',
        a: ['Reliability', 'Maintainability', 'Correctness', 'Sandboxing'],
        correct: 3,
        expl: 'Reliability and maintainability are quality attributes; correctness (functional correctness) is the baseline of working code. "Sandboxing" is a security/runtime concept, not a standard quality attribute.'
      },
      {
        q: 'A customer service tool is deployed 24/7 for users worldwide, and downtime must be near zero. Which quality attribute is most critical for this system?',
        a: ['Modifiability', 'Reliability', 'Correctness', 'Security'],
        correct: 1,
        expl: 'A 24/7 system where downtime is unacceptable requires high reliability. Reliability ensures it continues operating correctly even under faults or heavy load.'
      },
      {
        q: 'In the context of software engineering, what does it mean that “Working code is baseline, quality decides success”?',
        a: ['High code coverage makes a system successful.', 'Working code is the minimum; success depends on attributes like maintainability and reliability.', 'Only performance metrics determine success.', 'If code compiles, design quality is irrelevant.'],
        correct: 1,
        expl: 'Working code (correctness) is the minimum requirement. Beyond that, quality attributes (such as maintainability, reliability, etc.) determine whether a system is successful and sustainable.'
      },
      {
        q: 'In a development project, which of the following best illustrates poor maintainability?',
        a: ['The system has no bugs in production.', 'Developers struggle to find where to fix issues and often break unrelated parts.', 'The software uses one bug tracker.', 'End-users can access the system from multiple devices.'],
        correct: 1,
        expl: 'Poor maintainability is characterized by difficulty understanding and modifying the code, leading to a high risk of breaking things when making changes.'
      },
      {
        q: 'If a new feature is requested by users after deployment, which stage of the lifecycle will the team primarily work in?',
        a: ['Design', 'Coding (Build)', 'Maintenance', 'Testing'],
        correct: 2,
        expl: 'Adding new features after deployment is part of the maintenance phase, as the system is already released and live.'
      },
      {
        q: 'Which statement about the software design process is TRUE?',
        a: ['It is best to skip design to save time if deadlines are tight.', 'Systems built in stages (design, code, test, deploy, maintain) reduce future problems.', 'Implementation should always be done without design documents.', 'Design should be the final step after deployment.'],
        correct: 1,
        expl: 'Systems are built in stages and skipping steps causes future problems. Following all phases (design, code, test, etc.) helps ensure a robust and maintainable system.'
      },
      {
        q: 'Which activity is not typically part of the design phase of the software lifecycle?',
        a: ['Defining system modules and interfaces.', 'Writing unit test cases.', 'Creating UML diagrams for system architecture.', 'Outlining database schema.'],
        correct: 1,
        expl: 'Writing test cases is part of the testing phase, not design. Design involves planning modules, interfaces, and architecture (e.g., UML diagrams).'
      },
      {
        q: 'Which of the following best describes a functional requirement (often expressed using use cases)?',
        a: ['A description of the system\'s performance', 'A specification of what the system should do', 'A constraint on the system\'s design', 'A measure of the system\'s reliability'],
        correct: 1,
        expl: 'A functional requirement specifies what the system should do, detailing its behaviors and functionalities. This distinguishes it from performance, design constraints, or reliability measures.'
      },
      {
        q: 'In system design terms, which principle ensures the system continues to operate correctly even if part of it fails?',
        a: ['Observability', 'Reliability', 'Scalability', 'Encapsulation'],
        correct: 1,
        expl: 'Reliability ensures a system keeps functioning correctly even when some components fail.'
      }
    ]
  },
  {
    id: 'sdse-2',
    title: 'SDSE DPP 2: Object Oriented Programming',
    type: 'mcq',
    description: 'Classes, objects, constructors, inheritance, polymorphism, and encapsulation.',
    questions: [
      {
        q: 'Which of the following best describes a class in object-oriented programming?',
        a: ['A variable that holds data.', 'A blueprint or template for creating objects.', 'A function that returns values.', 'A specific instance of data in memory.'],
        correct: 1,
        expl: 'A class is like a blueprint or template that defines attributes (data) and behaviors (methods) for objects. Objects are instances created from that class.'
      },
      {
        q: 'What is true about objects in OOP?',
        a: ['Objects are templates and occupy no memory.', 'Objects define methods but not data.', 'An object is an instance of a class and occupies memory.', 'Objects can\’t have methods.'],
        correct: 2,
        expl: 'Objects are actual instances built from a class blueprint, and each object occupies memory with its own state and behavior. A class by itself does not hold instance data until objects are created.'
      },
      {
        q: 'Consider a class with only parameterized constructors. If you attempt to create an object without passing the required arguments, what happens?',
        a: ['The object is created with default parameter values.', 'A compile-time (or runtime) error will occur.', 'The language automatically provides a default constructor.', 'The program silently ignores the missing parameters.'],
        correct: 1,
        expl: 'If a class only has parameterized constructors, calling new ClassName() without arguments doesn\’t match any constructor signature, causing an error at compile time (or runtime in some languages).'
      },
      {
        q: 'How can you achieve constructor overloading in TypeScript or similar languages?',
        a: ['Define multiple constructors with different parameter names.', 'Declare multiple constructor signatures but implement only one with optional parameters.', 'Create constructors with different names.', 'TypeScript does not allow any form of constructor overloading.'],
        correct: 1,
        expl: 'In TypeScript, you can declare multiple constructor signatures but provide only one implementation (often using optional parameters). Only one constructor body is allowed, handling all cases.'
      },
      {
        q: 'Which example represents a valid class invariant?',
        a: ['In a BankAccount class, balance >= 0 .', 'In a Teacher class, the name changes randomly.', 'A Car class with seatingCapacity = 0 .', 'An object has an ID that changes each method call.'],
        correct: 0,
        expl: 'A class invariant is a condition that must always hold true for an object. For example, a BankAccount invariant balance >= 0 ensures consistent and predictable behavior. The other options describe states that violate logical rules or lack consistency.'
      },
      {
        q: 'Why are class invariants important in object-oriented design?',
        a: ['They allow methods to skip error checking.', 'They guarantee object state consistency, reducing bugs.', 'They ensure every method has a return statement.', 'They prevent a class from having any attributes.'],
        correct: 1,
        expl: 'Invariants establish conditions that must always be true, helping catch errors early and maintain consistent object state. This leads to fewer bugs and easier maintenance.'
      },
      {
        q: 'Which practice improves encapsulation while still allowing observation of a class\'s behavior?',
        a: ['Making all fields public and logging each change globally.', 'Using private fields with public getters/setters and adding logging inside those methods.', 'Storing state in global variables and using static methods to access them.', 'Putting business logic into Data Transfer Objects (DTOs).'],
        correct: 1,
        expl: 'Using private fields ensures encapsulation, and getters/setters control access. Adding logging inside getters/setters lets us observe usage while keeping data protected. Public fields or global variables break encapsulation.'
      },
      {
        q: 'Which of the following is an example of abstraction in software design?',
        a: ['Writing a complex if/else chain to handle every case.', 'Creating a detailed flowchart of every method\’s implementation.', 'Providing a simple interface that hides underlying complexity from the user.', 'Copying code from one class to another to reuse behavior.'],
        correct: 2,
        expl: 'Abstraction hides complex implementation details and exposes only necessary functionality. For instance, using a device via simple controls without knowing its internals is abstraction. The other options either complicate or duplicate code.'
      },
      {
        q: 'What is the main purpose of an interface in OOP?',
        a: ['To provide a full implementation that classes must inherit.', 'To define a contract or set of methods that implementing classes must provide.', 'To instantiate objects directly.', 'To store private state that only one class can access.'],
        correct: 1,
        expl: 'An interface defines a contract of method signatures that any implementing class must follow. It specifies what methods do, without providing their implementation.'
      },
      {
        q: 'Which statement is TRUE regarding classes and interfaces?',
        a: ['A class can extend multiple classes in languages like Java.', 'Interfaces can have constructors.', 'A class can implement multiple interfaces, but can extend only one class.', 'Interface methods must include a method body.'],
        correct: 2,
        expl: 'Typically, a class can implement multiple interfaces but only extend one superclass. Interfaces do not have constructors and only declare method signatures.'
      },
      {
        q: 'In OOP, what does the term polymorphism refer to?',
        a: ['One class having more than one constructor.', 'A function or method having multiple forms (e.g., overridden methods in different classes).', 'Storing multiple objects in the same array.', 'Encrypting code in multiple formats.'],
        correct: 1,
        expl: 'Polymorphism (especially runtime polymorphism) means one interface (method name) can represent different underlying forms. For example, subclasses overriding a common method to behave differently is polymorphism.'
      },
      {
        q: 'Which scenario is an example of polymorphism?',
        a: ['Overloading a method with different parameters in the same class.', 'A parent-class reference referring to a child-class object at runtime.', 'Writing different code for each class separately.', 'Having two classes with no relationship share a variable name.'],
        correct: 1,
        expl: 'When a parent-class reference refers to a subclass object and invokes overridden methods, this is runtime polymorphism (dynamic binding). Option A is compile-time (method overloading), while B is classic polymorphism.'
      },
      {
        q: 'What is the relationship between inheritance and composition?',
        a: ['They are the same: both indicate an "is-a" relationship.', 'Composition ("has-a") is often more flexible than inheritance ("is-a") and does not force a strict hierarchy.', 'Inheritance should always be used instead of composition for code reuse.', 'Composition means a class cannot contain objects of another class.'],
        correct: 1,
        expl: 'Inheritance creates an "is-a" relationship (strong coupling), while composition defines a "has-a" relationship (flexible composition of objects). Composition is generally safer as it avoids rigid hierarchies.'
      },
      {
        q: 'Which of the following best describes an example of composition in OOP?',
        a: ['Class B extends class A to inherit its methods.', 'Class A uses an instance of class B as a member; if A is destroyed, B also ceases to exist.', 'Class A and class B both implement interface I.', 'Class A contains no references to other classes.'],
        correct: 1,
        expl: 'Composition means one class contains another as part of its state, creating a "whole-part" relationship. The contained object\’s lifetime is tied to the container (destroying A also destroys its B).'
      },
      {
        q: 'What is the difference between an interface and an abstract class?',
        a: ['An interface can contain method implementations, but an abstract class cannot.', 'A class can extend multiple abstract classes but only one interface.', 'Abstract classes can have implemented methods and state; interfaces only declare methods (contracts).', 'Interfaces cannot be used in polymorphism.'],
        correct: 2,
        expl: 'Interfaces define method signatures (contracts) with no implementations, while abstract classes can provide common behavior (implemented methods) and enforce structure, combining contract and reuse.'
      },
      {
        q: 'Which principle does an interface primarily enforce in software design?',
        a: ['Fast execution.', 'Loose coupling by programming to contracts, not concrete classes.', 'Strong encapsulation by hiding all attributes.', 'Multiple inheritance of implementation.'],
        correct: 1,
        expl: 'Interfaces help enforce loose coupling by allowing code to depend on abstract contracts (interfaces) rather than concrete implementations, making the design more flexible and easier to change.'
      },
      {
        q: 'What is the relationship between a parent class and a subclass in terms of memory?',
        a: ['Only the subclass instance occupies memory; the parent class definition does not.', 'Only the parent class occupies memory; subclasses do not.', 'Neither occupies memory until a separate object is instantiated.', 'Both parent and subclass occupy equal memory.'],
        correct: 0,
        expl: 'The class definition itself (parent or subclass) does not occupy object memory; only when you create an object does it consume memory. A subclass instance contains inherited and its own fields and occupies memory. The parent class as a type is just a blueprint.'
      },
      {
        q: 'In UML class diagrams, a solid line with a closed (filled) arrowhead from a subclass to its superclass represents which relationship?',
        a: ['Realization (implements interface)', 'Generalization (inheritance)', 'Association (has-a)', 'Dependency'],
        correct: 1,
        expl: 'A solid line with a closed arrowhead indicates generalization (inheritance). The arrow points from the subclass to the superclass, meaning “subclass is-a superclass.”'
      },
      {
        q: 'In contrast, what does a dashed line with a closed arrowhead denote in UML class diagrams?',
        a: ['Generalization', 'Realization (implements an interface)', 'Aggregation', 'Composition'],
        correct: 1,
        expl: 'A dashed line with a triangular arrowhead (realization) indicates that a class implements an interface. It shows that the class promises to provide the methods of that interface.'
      },
      {
        q: 'In UML, which of the following is an association relationship?',
        a: ['Subclass "is-a" superclass.', 'Class contains another as part (composition).', 'Class uses another class (a link or reference).', 'Class implements an interface.'],
        correct: 2,
        expl: 'An association in UML (usually drawn as a plain line) indicates that one class uses or is linked to another (a "has-a" relationship without implying ownership). Composition is a stronger form of association with ownership.'
      },
      {
        q: 'What does the term polymorphism mean in object-oriented programming?',
        a: ['Having the same class name in multiple packages.', 'A single method name used in different classes with different implementations.', 'Using only primitive data types in methods.', 'Encrypting method names for security.'],
        correct: 1,
        expl: 'Polymorphism means "many forms". In OOP, it refers to the ability of different classes to implement methods with the same name differently. For example, different subclasses can have their own version of a method declared in a common interface or superclass.'
      },
      {
        q: 'How is a class field with protected visibility shown in UML?',
        a: ['With a “+” symbol', 'With a “–” symbol', 'With a “#” symbol', 'With a “*” symbol'],
        correct: 2,
        expl: 'In UML, “#” denotes protected visibility (accessible within the class and its subclasses). “–” is private and “+” is public.'
      },
      {
        q: 'In UML, what is one benefit of using interfaces?',
        a: ['Interfaces let classes share code without inheritance.', 'Interfaces enforce method signatures (contracts) and promote loose coupling.', 'Interfaces allow multiple inheritance of implementation.', 'Interfaces automatically generate getter/setter methods.'],
        correct: 1,
        expl: 'Interfaces enforce a contract by specifying method signatures. This lets classes implement the interface and still be used interchangeably, promoting loose coupling because client code depends on the interface, not a specific class.'
      },
      {
        q: 'Which option is the best example of abstraction?',
        a: ['Hiding how something works and showing only what it does', 'Writing many if/else statements to choose behavior', 'Copying the same code into multiple classes', 'Creating more classes than necessary'],
        correct: 0,
        expl: 'Abstraction keeps usage simple by exposing only the important actions while hiding internal details.'
      },
      {
        q: 'Which design choice improves encapsulation while maintaining observability in TypeScript?',
        a: ['Exposing all class fields publicly', 'Using private fields with getters/setters and logging access', 'Removing methods and using global variables', 'Making DTOs contain business logic'],
        correct: 1,
        expl: 'Private fields preserve encapsulation, and getters/setters allow controlled access while enabling logging for observability.'
      },
      {
        q: 'What will happen if you create an object of a class with a parameterized constructor but do not pass any arguments?',
        a: ['The object will be created using default values.', 'An Error will be thrown.', 'The object will have undefined properties.', 'The constructor will not be called.'],
        correct: 1,
        expl: 'A parameterized constructor expects required inputs. If you don’t pass them, the call doesn’t match the constructor signature, so you get an error.'
      },
      {
        q: 'A class BankAccount has the following attributes:\nprivate accountNumber : string\nprivate balance : number\nprotected bankName : string\npublic interestRate : number\nWhich visibility symbol represents "protected" in UML?',
        a: ['-', '+', '#', '~'],
        correct: 2,
        expl: 'In UML notation, "-" is private, "+" is public, and "#" is protected.'
      },
      {
        q: 'If a teacher’s name can be displayed anywhere in the system (reports, websites, etc.), which visibility should it have?',
        a: ['Private (-)', 'Protected (#)', 'Public (+)', 'Internal (~)'],
        correct: 2,
        expl: 'Public (+) visibility means the attribute can be accessed from anywhere in the system.'
      }
    ]
  },
  {
    id: 'sdse-3',
    title: 'SDSE DPP 3: Unified Modeling Language',
    type: 'mcq',
    description: 'Class diagrams, sequence diagrams, use cases, and UML notations.',
    questions: [
      {
        q: 'Which of the following elements is not typically shown in a UML Class Diagram?',
        a: ['Class attributes and operations.', 'Relationships between classes (association, inheritance, etc.).', 'The execution sequence of methods or runtime messages.', 'Visibility (public/private) of class members.'],
        correct: 2,
        expl: 'UML class diagrams show classes with their attributes, operations, and relationships. They do not show execution sequences or dynamic behavior.'
      },
      {
        q: 'In a UML class diagram, what is the multiplicity notation for "one-to-many"?',
        a: ['1 – 1', '1 – * (or 1 – “crow’s foot”)', '* – 1', '* – *'],
        correct: 1,
        expl: '“1” at one end and “*” (or a crow’s foot symbol) at the other end indicates a one-to-many relationship: one instance of the first class relates to many instances of the second class.'
      },
      {
        q: 'What does a solid black diamond at the end of an association line represent?',
        a: ['Inheritance (generalization)', 'Aggregation (shared ownership)', 'Composition (strong ownership)', 'Interface realization'],
        correct: 2,
        expl: 'A filled (black) diamond represents composition, a strong form of aggregation where the contained object’s lifetime is bound to the container (if the whole is destroyed, parts are too).'
      },
      {
        q: 'Which UML diagram is best for modeling the interactions between objects over time (step-by step messages)?',
        a: ['Class Diagram', 'Sequence Diagram', 'Use Case Diagram', 'Component Diagram'],
        correct: 1,
        expl: 'Sequence diagrams show how objects interact with each other in a time-ordered sequence of messages. They are ideal for modeling dynamic behavior over time.'
      },
      {
        q: 'In a UML Sequence Diagram, what does a dashed vertical line (lifeline) with an “X” at the bottom indicate?',
        a: ['The creation of an object.', 'The destruction of an object.', 'A synchronous message.', 'A branching of control.'],
        correct: 1,
        expl: 'In a sequence diagram, a lifeline ending in an “X” indicates the object is destroyed at that point (end of its lifetime in the interaction).'
      },
      {
        q: 'In a UML Sequence Diagram, a solid arrow with a filled arrowhead typically represents a call message. What does a dashed arrow with an open arrowhead represent?',
        a: ['A self-call.', 'An external event.', 'A return message (response).', 'A data flow.'],
        correct: 2,
        expl: 'A solid arrow with a closed head is usually a call (method invocation). A dashed arrow with an open arrowhead in sequence diagrams represents the return message (returning control back to the caller).'
      },
      {
        q: 'Which UML diagram is most appropriate for visualizing the functional requirements and actors of a system?',
        a: ['Class Diagram', 'Sequence Diagram', 'Use Case Diagram', 'Activity Diagram'],
        correct: 2,
        expl: 'Use Case Diagrams show actors (users or external systems) and the use cases (system functionality) they interact with, defining what the system does from an external viewpoint.'
      },
      {
        q: 'What does the system boundary (a rectangle around use cases) represent in a Use Case Diagram?',
        a: ['The physical servers hosting the system.', 'The user interface of the system.', 'The scope of the system – what is included (use cases) vs. external actors.', 'The timeline of the system’s development.'],
        correct: 2,
        expl: 'The system boundary box encloses the use cases (system functionality) and separates them from external actors. It defines the scope of the system: what’s inside (the system’s responsibilities) and what’s outside.'
      },
      {
        q: 'In a use case diagram, which relationship is depicted by «include»?',
        a: ['An optional extension to a base use case.', 'A mandatory reuse of behavior (one use case always includes another’s functionality).', 'A generalization of one use case by another.', 'An association between actors.'],
        correct: 1,
        expl: '«include» indicates that a base use case always includes the behavior of the included use case (the included use case is a mandatory part of the base use case).'
      },
      {
        q: 'Which relationship in use case diagrams is used to show that one use case adds optional behavior to another?',
        a: ['«include»', '«extend»', 'Generalization', 'Association'],
        correct: 1,
        expl: '«extend» means the extending use case adds optional behavior to the base use case under certain conditions. The base use case can function without the extension except when the extension is triggered.'
      },
      {
        q: 'Actors in a Use Case Diagram are typically drawn:',
        a: ['Inside the system boundary.', 'Outside the system boundary.', 'At the bottom of the diagram.', 'They are not depicted in Use Case Diagrams.'],
        correct: 1,
        expl: 'Actors (users or external systems) are drawn outside the system boundary, indicating they are external to the system.'
      },
      {
        q: 'Which statement is TRUE about UML diagrams?',
        a: ['A Class Diagram shows object interactions over time.', 'A Sequence Diagram models static class relationships.', 'A Use Case Diagram represents functional requirements and actors.', 'Activity Diagrams show class hierarchies.'],
        correct: 2,
        expl: 'Use Case Diagrams represent functional requirements and actors. Class Diagrams show static structure, Sequence Diagrams show dynamic interactions, and Activity Diagrams model workflows.'
      },
      {
        q: 'In a UML Class Diagram, which of the following is shown?',
        a: ['The order of method calls at runtime.', 'The classes, their attributes and methods, and relationships.', 'The flow of control between different states.', 'The instances (objects) and their current values.'],
        correct: 1,
        expl: 'Class diagrams show the static structure: classes with attributes and methods, plus relationships like inheritance and association. They do not show runtime behavior or object instances.'
      },
      {
        q: 'In a UML Sequence Diagram, what does a solid horizontal arrow with a filled arrowhead represent?',
        a: ['Creation of an object.', 'Invocation of a method (synchronous call).', 'Deletion of an object.', 'An actor’s message.'],
        correct: 1,
        expl: 'A solid horizontal arrow with a filled arrowhead typically indicates a synchronous method call from one object to another.'
      },
      {
        q: 'What does a lifeline with a dashed vertical line represent in UML?',
        a: ['The inheritance hierarchy of a class.', 'The existence of an object during an interaction.', 'A fragmented object.', 'A conditional path.'],
        correct: 1,
        expl: 'In sequence diagrams, each object or actor has a lifeline (vertical dashed line) that represents its existence during the interaction.'
      },
      {
        q: 'Consider the following UML Sequence Diagram for an Online Food Ordering System. After the restaurant marks the food as ready, a message labeled ??? is sent before the delivery driver responds with accepted.',
        a: ['Restaurant → App: notify delivery', 'Restaurant → DeliveryDriver: assign order', 'DeliveryDriver → Restaurant: pickup request', 'App → DeliveryDriver: deliver order'],
        correct: 1,
        expl: 'After food is ready, the restaurant assigns/notifies the delivery driver to pick up the order.',
        img: '/images/sdse/q6_sequence.png'
      },
      {
        q: 'A Customer must log in to the system before placing an order. In the use case diagram, what relationship should be used between "Place Order" and "Login"?',
        a: ['«extend»', '«include»', '«uses»', 'Generalization'],
        correct: 1,
        expl: 'The Customer MUST login to place an order, making it a mandatory (include) relationship.'
      },
      {
        q: 'In a use case diagram, which relationship is used to show that one use case is a mandatory part of another?',
        a: ['«include»', '«extend»', '«uses»', 'Generalization'],
        correct: 0,
        expl: 'The «include» relationship is used when one use case contains the functionality of another use case as a mandatory part of its process.'
      },
      {
        q: 'In a UML Sequence Diagram, the Payment Service has a dashed vertical line extending downward. What does this represent?',
        a: ['Actor', 'Lifeline', 'Message', 'System Boundary'],
        correct: 1,
        expl: 'A dashed vertical line represents a lifeline, showing the existence of an object during the interaction.'
      },
      {
        q: 'The UML use case diagram shows a relationship between "Book Flight" and "Select Seat" labeled with «extend». What does this indicate?',
        a: ['Select Seat is mandatory', 'Select Seat is an optional enhancement', 'Book Flight requires Select Seat', 'Both use cases are independent'],
        correct: 1,
        expl: 'In a use case diagram, «extend» means the extending use case adds optional behavior to the base use case.'
      },
      {
        q: 'According to the Sequence Diagram, what do synchronous call and return message arrows look like?',
        a: ['Solid arrow = Return, Dashed arrow = Call', 'Solid arrow = Call, Dashed arrow = Return', 'Solid arrow = Actor, Dashed arrow = Lifeline', 'Solid arrow = Extend, Dashed arrow = Include'],
        correct: 1,
        expl: 'Solid arrow shows a call/request (synchronous). Dashed arrow represents the return message.'
      },
      {
        q: 'Which UML diagram shows interactions between objects arranged according to time sequence?',
        a: ['Sequence Diagram', 'Use Case Diagram', 'Class Diagram', 'Object Diagram'],
        correct: 0,
        expl: 'A sequence diagram models object interactions over time.'
      },
      {
        q: 'A Library manages a collection of Books. Books can exist even if a Library is closed. What relationship is this?',
        a: ['Aggregation', 'Composition', 'Inheritance', 'Generalization'],
        correct: 0,
        expl: 'This is aggregation because the lifecycle of the Book is independent of the Library.'
      },
      {
        q: 'A Manager and Developer both inherit from Employee. Each Employee has an IDCard that cannot exist without them. What are these two relationships?',
        a: ['Inheritance and Aggregation', 'Inheritance and Composition', 'Association and Composition', 'Generalization and Association'],
        correct: 1,
        expl: 'Manager/Developer inheriting is Generalization/Inheritance. IDCard tied to Employee lifecycle is Composition.'
      }
    ]
  },
  {
    id: 'sdse-4',
    title: 'SDSE DPP 4: Entity-Relationship Diagrams',
    type: 'mcq',
    description: 'Entities, relationships, attributes, cardinality, and participation.',
    questions: [
      {
        q: 'In ER modeling, which of the following is best modeled as a relationship rather than an attribute?',
        a: ['Date of birth of a Person.', 'Enrollment linking Student and Course.', 'Salary of an Employee.', 'Color of a Car.'],
        correct: 1,
        expl: 'Enrollment represents an association (interaction) between Student and Course entities, so it should be a relationship. The other options are intrinsic properties of a single entity (attributes).'
      },
      {
        q: 'Consider a one-to-many relationship: one teacher teaches many students, each student has exactly one teacher. In Crow’s Foot notation, where should the crow’s foot symbol be placed?',
        a: ['On the Teacher side.', 'On the Student side.', 'On both sides.', 'Crow’s foot isn’t used for one-to-many.'],
        correct: 1,
        expl: 'The crow’s foot symbol is placed on the “many” side of the relationship. Since one teacher can have many students, the crow’s foot is on the Student side, indicating multiple students per teacher.'
      },
      {
        q: 'What does the crow’s foot symbol alone (a fork shape) indicate in Crow’s Foot notation?',
        a: ['Exactly one.', 'Zero or one.', 'One or many.', 'Zero or many.'],
        correct: 3,
        expl: 'The crow’s foot symbol indicates "many" (zero or many) on that side of the relationship.'
      },
      {
        q: 'In a bookstore database, each Book has exactly one Publisher, but a Publisher can publish many Books. What is the relationship between Publisher and Book?',
        a: ['One-to-one.', 'One-to-many (Publisher-to-Books).', 'Many-to-many.', 'Many-to-one.'],
        correct: 1,
        expl: 'One publisher can be associated with many books (one-to-many relationship), with the crow’s foot on the Book side.'
      },
      {
        q: 'In ERD, what is a primary key (PK)?',
        a: ['A field that can have NULL values.', 'A unique identifier for entity instances.', 'A field that appears in multiple tables.', 'A special kind of index.'],
        correct: 1,
        expl: 'A primary key uniquely identifies each instance of an entity (e.g., each row in a table).'
      },
      {
        q: 'Which statement is TRUE about foreign keys (FK)?',
        a: ['A foreign key references a unique key of another table.', 'A foreign key cannot contain duplicate values.', 'A foreign key is always the same as the table’s primary key.', 'A table cannot have more than one foreign key.'],
        correct: 0,
        expl: 'A foreign key is used to link to another table’s primary key (or any unique key), establishing a relationship between the tables.'
      },
      {
        q: 'Given the entities Employee and IDCard, where each Employee has exactly one IDCard and an IDCard cannot exist without its Employee, what type of relationship is this?',
        a: ['Association', 'Aggregation', 'Composition', 'Inheritance'],
        correct: 2,
        expl: 'This is composition: an IDCard exists only as part of an Employee, and is destroyed if the Employee is removed. The lifecycle of the IDCard is bound to the Employee.'
      },
      {
        q: 'What is a derived attribute in ER modeling?',
        a: ['An attribute that must be manually updated.', 'An attribute whose value can be calculated from other attributes.', 'An attribute that is also a primary key.', 'An attribute composed of multiple sub-attributes.'],
        correct: 1,
        expl: 'A derived attribute is one that can be computed from other attributes. For example, Age can be derived from DateOfBirth.'
      },
      {
        q: 'Which of the following is an example of a derived attribute?',
        a: ['First Name of a Person.', 'Age of a Person.', 'Phone Number of an Employee.', 'Email of a Customer.'],
        correct: 1,
        expl: 'Age is derived from DateOfBirth, so it is a derived attribute. The others are stored directly.'
      },
      {
        q: 'In ERD, what does total (mandatory) participation mean for an entity?',
        a: ['Each entity in one set must relate to at least one entity in the other set.', 'An entity can exist without participating in the relationship.', 'Exactly one participation is required.', 'No relationship involvement is needed.'],
        correct: 0,
        expl: 'Total (or mandatory) participation means every instance of the entity must be involved in the relationship. For example, if every Order must have a Customer, Orders have total participation in the “places” relationship.'
      },
      {
        q: 'Which scenario indicates partial participation in a relationship?',
        a: ['Every student must enroll in a course.', 'Some employees may not manage any projects.', 'Each product has exactly one supplier.', 'A car always has a driver.'],
        correct: 1,
        expl: 'Partial participation means some instances may not participate. If some employees manage no projects, then the employee’s participation in the “manages” relationship is partial.'
      },
      {
        q: 'What does an “N” near both ends of a relationship line mean in Chen notation?',
        a: ['One-to-one relationship.', 'One-to-many relationship.', 'Many-to-many relationship.', 'No relationship.'],
        correct: 2,
        expl: 'In Chen notation, an “N” at both ends indicates a many-to-many relationship between the entities.'
      },
      {
        q: 'If each instance of A links to exactly one instance of B, but each instance of B links to many instances of A, how is this classified?',
        a: ['One-to-one.', 'One-to-many (from B to A).', 'Many-to-one (from A to B).', 'Many-to-many.'],
        correct: 2,
        expl: 'Each A has one B (A→B), but each B has many A. This is many-to-one from A’s perspective (or one-to-many from B’s perspective).'
      },
      {
        q: 'In Crow’s Foot notation, what symbol denotes optional participation (zero or many)?',
        a: ['A small circle (o) next to the entity.', 'A thick line.', 'A dashed line.', 'A crow’s foot on both ends.'],
        correct: 0,
        expl: 'In Crow’s Foot notation, a small circle (O) indicates optional participation (zero or more), while a straight line (|) indicates mandatory (one or more).'
      },
      {
        q: 'What is the main purpose of an ER diagram in database design?',
        a: ['To determine the order of SQL queries.', 'To model the database’s structure (entities, relationships, attributes) before implementation.', 'To store data values.', 'To display the data at runtime.'],
        correct: 1,
        expl: 'ER diagrams are conceptual models used to capture entities, attributes, and relationships, which guide the creation of the actual database schema.'
      },
      {
        q: 'In Crow’s Foot notation (ER modeling), what does the crow’s foot symbol at the end of a relationship line represent?',
        a: ['Exactly one', 'Zero or one', 'One or many', 'Many'],
        correct: 3,
        expl: 'The crow’s foot symbol indicates many, meaning multiple instances can exist on that side of the relationship.',
        img: '/images/sdse/q1_crows_foot.png'
      },
      {
        q: 'Which of the following should be modeled as a relationship, NOT as an attribute?',
        a: ['Age of a Person', 'Date of Birth', 'Salary', 'Enrollment between Student and Course'],
        correct: 3,
        expl: 'Enrollment represents an interaction between two entities (Student and Course), so it must be modelled as a relationship, not a simple attribute.'
      },
      {
        q: 'One author can write many books, but each book has only one author. In crow\'s foot notation, where should the crow\'s foot symbol be placed?',
        a: ['On the AUTHOR side', 'On the BOOK side', 'On both sides', 'Crow\'s foot is not used for this relationship'],
        correct: 1,
        expl: 'The crow\'s foot goes on the "many" side of the relationship. Since one author can write MANY books, the crow\'s foot symbol is placed on the BOOK side.'
      },
      {
        q: 'Which attribute is best modeled as a derived attribute?',
        a: ['date_of_birth', 'employee_id', 'age', 'phone_number'],
        correct: 2,
        expl: 'Age can be calculated from Date of Birth, so it is a derived attribute rather than stored directly.'
      },
      {
        q: 'Which statement is TRUE about Primary Key (PK) and Foreign Key (FK)?',
        a: ['A primary key need not always be unique', 'A primary key can have NULL values', 'A foreign key references a primary key or a unique key of another table', 'A table can have multiple primary keys'],
        correct: 2,
        expl: 'A foreign key references a unique attribute in another table (usually the Primary Key).'
      },
      {
        q: 'An Order is linked to a Customer, but both are treated as distinct entities and can exist independently. What type of relationship is this?',
        a: ['Aggregation', 'Composition', 'Simple Association', 'Generalization'],
        correct: 2,
        expl: 'Since both are independent and neither controls the lifecycle of the other, it is a simple association.'
      }
    ]
  },
  {
    id: 'sdse-5',
    title: 'SDSE DPP 5: Software Design Patterns',
    type: 'mcq',
    description: 'Creational, structural, and behavioral patterns (Singleton, Factory, etc.).',
    questions: [
      {
        q: 'What is the primary intent of the Singleton design pattern?',
        a: ['To ensure a class has only one instance and provide global access to it.', 'To allow multiple instances sharing a state.', 'To create objects without using the new keyword.', 'To extend the life of an object in memory.'],
        correct: 0,
        expl: 'The Singleton pattern ensures exactly one instance of a class is created and provides a global point of access to it.'
      },
      {
        q: 'Which of the following is not a component of a typical Singleton implementation?',
        a: ['A private constructor.', 'A static method to get the instance.', 'A public static field holding the single instance.', 'Multiple public constructors with different parameters.'],
        correct: 3,
        expl: 'A Singleton class has a private constructor to prevent external instantiation, a private static field for the single instance, and a public static method (often getInstance() ) to access it. It should not have public constructors.'
      },
      {
        q: 'Why might using a Singleton be risky in a large application?',
        a: ['It always uses too much memory.', 'It introduces global state and can make unit testing difficult.', 'Singleton objects are garbage collected immediately.', 'It prevents any other classes from being instantiated.'],
        correct: 1,
        expl: 'While Singleton provides a shared instance, it also creates global state and can tightly couple code to that instance, making testing and maintenance harder.'
      },
      {
        q: 'Which scenario is a good use-case for the Singleton pattern?',
        a: ['A utility class with only static methods.', 'A Logger class where the entire application writes to the same log file.', 'Data Transfer Objects (DTOs) that carry data between layers.', 'A plain data structure with no behavior.'],
        correct: 1,
        expl: 'A Logger is a common example: we want one global logger instance throughout the app. Utility classes often use static methods without needing an instance, and DTOs or plain data structures don’t need Singleton.'
      },
      {
        q: 'What problem does the Factory design pattern solve?',
        a: ['It creates one global object.', 'It centralizes object creation and decouples client code from concrete classes.', 'It deletes objects automatically.', 'It ensures objects are always singletons.'],
        correct: 1,
        expl: 'The Factory pattern centralizes creation logic in one place and lets clients request objects via an abstract interface, hiding concrete class details.'
      },
      {
        q: 'Which of the following is a benefit of using the Factory pattern?',
        a: ['Adding a new type requires changes in many places.', 'Client code must know all concrete classes.', 'Client code can stay unchanged when new types are added.', 'It prevents creation of any new objects.'],
        correct: 2,
        expl: 'A key benefit is that new product types can be added by extending the factory, without modifying existing client code. Clients ask the factory for objects by an abstract type, so existing code doesn\'t need changes.'
      },
      {
        q: 'In a simple factory, what is the central component?',
        a: ['A single method or class responsible for creating objects based on parameters.', 'A method for deleting objects.', 'A global object manager.', 'A static variable that holds all instances.'],
        correct: 0,
        expl: 'A simple factory has a single method or class (often called the factory) that creates objects according to input or configuration, centralizing creation logic.'
      },
      {
        q: 'How does the Factory pattern contribute to code maintainability?',
        a: ['It removes the need for interfaces.', 'It allows creation logic to be in one place, making updates easier (change in one place).', 'It avoids the use of inheritance.', 'It automatically tests new classes.'],
        correct: 1,
        expl: 'By centralizing object creation, the Factory pattern means changes in how objects are created (or new types are added) occur in one place (the factory), keeping client code unchanged and easier to maintain.'
      },
      {
        q: 'Which of the following best describes the difference between a Singleton and a Factory?',
        a: ['Singleton guarantees a single instance; Factory abstracts the creation of objects.', 'Singleton is a behavioral pattern; Factory is structural.', 'Singleton requires an abstract class; Factory does not.', 'They are two names for the same concept.'],
        correct: 0,
        expl: 'Singleton ensures only one instance of a class exists. The Factory pattern is about creating objects (often multiple types) without specifying exact classes, providing flexibility in instantiation.'
      },
      {
        q: 'An application needs to support sending notifications via Email, SMS, and Push. Which design pattern is most suitable to manage creation of different notifier objects?',
        a: ['Singleton Pattern.', 'Factory Pattern.', 'Observer Pattern.', 'Decorator Pattern.'],
        correct: 1,
        expl: 'A Factory can be used to create different types of notification objects (EmailNotifier, SMSNotifier, PushNotifier, etc.) based on configuration, decoupling the client from concrete classes. Singleton doesn’t address multiple types, and Observer/Decorator are unrelated to creation.'
      },
      {
        q: 'If a class has a method getInstance() that always returns the same object, which pattern is this an example of?',
        a: ['Factory', 'Singleton', 'Prototype', 'Strategy'],
        correct: 1,
        expl: 'A getInstance() method returning the same object indicates a Singleton.'
      },
      {
        q: 'When adding a new notification type (e.g. Telegram) to a Notification Factory, which of the following is true?',
        a: ['Client code using the factory must be modified for Telegram.', 'Only the factory code is modified; existing clients remain unchanged.', 'No changes are needed anywhere.', 'A new Singleton must be created for Telegram.'],
        correct: 1,
        expl: 'With a Factory, adding a new type (like Telegram) involves updating the factory creation logic. Existing client code that asks for notifiers stays unchanged.'
      },
      {
        q: 'Which category do Singleton and Factory patterns belong to?',
        a: ['Creational patterns.', 'Structural patterns.', 'Behavioral patterns.', 'Concurrency patterns.'],
        correct: 0,
        expl: 'Both Singleton and Factory are creational patterns, because they deal with the process of object creation.'
      },
      {
        q: 'In the Factory pattern, objects created by the factory typically implement or extend:',
        a: ['The factory class itself.', 'A common interface or abstract class.', 'Static utility methods.', 'No interface is required.'],
        correct: 1,
        expl: 'Factory patterns usually create objects that implement a common interface or extend an abstract class, allowing the client to use them interchangeably without knowing their exact types.'
      },
      {
        q: 'Which pattern ensures only one instance of a resource manager exists in the application?',
        a: ['Singleton', 'Observer', 'Iterator', 'Prototype'],
        correct: 0,
        expl: 'The Singleton pattern ensures that a class has only one instance (for example, a resource or connection manager) throughout the application.'
      }
    ]
  },
];
