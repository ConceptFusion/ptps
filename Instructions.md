# Technical Exercise Requirements - PartsTrader find compatible parts

# Task Outline

The PartsTrader team are developing a set of APIs for use in our repairer estimating software. These APIs will provide the ability for repairers to lookup a given part and find all compatible parts that could be used instead. These APIs will be our interface for a look-up site that users can search for parts through. Your task is to build the react site that would interface with these API endpoints.

# Background

PartsTrader maintains a large catalogue of vehicle parts providing mappings between various national and international standards. When repairers submit part information to PartsTrader, either when quoting or when simply looking up a part, PartsTrader will cache the part information (if it doesn't already know of the part) so as to be able to provide as full and complete a list of parts information as possible to other integrations.
When creating work estimates repairers create a list of the parts need to repair a vehicle; for example, a car may require a new front wheel and a side mirror in order to be road worthy again. In many scenarios car parts are interchangeable; for example, a rear tail light for a 2014 Chevrolet Camaro might be the officially required part for a repair however a Ford Focus 2008 tail light may be either the exact same part or a close enough replacement. In order to maximise the response to part quotes, and thus hopefully reduce costs, repairers want to be able to lookup the central PartsTrader catalogue of parts and retrieve a list of all parts that could be used instead.
In some estimating software, there is no distinction made between a part and a line item, as such an estimate may contain pseudo parts which incur a charge but should not be included in quote requests for parts. For example a repairer may include 1111-OilCheck on their list of parts to indicate that they will be charging for an oil check, however this should not be submitted to PartsTrader as it either contains repair shop operational specifics that PartsTrader shouldn't know about, or it is data that PartsTrader should not be storing in the central parts repository (as this is available to all integrated repairers). In order to prevent non-standard parts being provided to PartsTrader each repairer can maintain their own exclusions list which contains a set of parts that should not be sent through to PartsTrader; it is important that our tools use this list to exclude parts that shouldn't be uploaded.

# Task

Full requirements for the integrated PartsTrader Parts Service are not known at present so a simple site is to be provided to demo the potential parts lookup site. Your task is to complete the demo react site such that it meets the following requirements:
Requirement 1 - Validate Part Number
When given a part number the client tools should validate it to ensure that it conforms to the following specification:
partNumber = partId "-" partCode;
partId     = {4 _ digit};
partCode   = {4 _ alphanumeric}, {alphanumeric};
That is a part id comprising of 4 digits, followed by a dash (-), followed by a part code consisting of 4 or more alphanumeric characters. So, 1234-abcd, 1234-a1b2c3d4 would be valid, a234-abcd, 123-abcd would be invalid. Where an invalid number is the user should be made aware of this on-screen.

# Requirement 2 - Check Exclusions List

Valid part numbers should be checked against the local exclusions list to determine whether the part should be supplied to PartsTrader or not. If the given part number is found in the list then the part should not be sent to PartsTrader; in this scenario, the lookup should return an empty collection.

# Requirement 3 - Lookup Compatible Parts

If a valid part is supplied that is not on the exclusions list then it should be looked up via the PartsTrader Parts Service (represented by the IPartsTraderPartsService interface) in order to retrieve any compatible parts. The results of this lookup should be returned.
Assumptions
The following assumptions have been made - you are free to countermand these as you feel is appropriate to your design.
1.      The exclusions list will be a JSON file (attached Exclusions.json file). It is acceptable to use this file directly as a mock for an API call.
2.      Part numbers are not case sensitive.
3.      It is sufficient to mock requests and responses for the purpose of testing.
Constraints
There are no constraints to your implemented solution. Use whatever tools you are comfortable with, if you don't have access to anything we recommend you use Visual Studio 2019 Community Edition (https://visualstudio.microsoft.com/vs/), or Visual Studio Code (https://code.visualstudio.com/). They’re free and will allow you to complete the exercise.
Looking forward to seeing what you create!  “
