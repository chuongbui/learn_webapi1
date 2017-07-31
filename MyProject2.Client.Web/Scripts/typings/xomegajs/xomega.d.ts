declare module xomega {
    class FieldCriteria {
        Label: string;
        Operator: string;
        Data: Array<string>;
        constructor(label: string, op: string, data: Array<string>);
    }
}
declare module xomega {
    class ErrorList {
        static fromError(err: Error): ErrorList;
        static fromJSON(obj: any): ErrorList;
        static fromErrorResponse(jqXHR: any, errorThrow: any): ErrorList;
        fromExceptionJSON(json: any): boolean;
        Errors: KnockoutObservableArray<ErrorMessage>;
        ErrorsText: KnockoutObservable<string>;
        constructor();
        private getMessage(code, ...params);
        addError(code: string, ...params: any[]): void;
        addWarning(code: string, ...params: any[]): void;
        criticalError(code: string, abort: boolean, ...params: any[]): void;
        abort(reason: string): void;
        hasErrors(): boolean;
        abortIfHasErrors(): void;
        mergeWith(otherList: ErrorList): void;
    }
}
declare module xomega {
    class ErrorMessage {
        constructor(code: string, message: string, severity: ErrorSeverity);
        Code: string;
        Message: string;
        Severity: ErrorSeverity;
        static fromJSON(obj: any): ErrorMessage;
    }
}
declare module xomega {
    enum ErrorSeverity {
        Warning = 0,
        Error = 1,
        Critical = 2,
    }
}
declare module xomega {
    function format(str: any, ...params: any[]): any;
    function getParams(params: Array<any>): any;
    function urlParam(url: string, param: any): string;
    function toCamelCase(str: string): string;
}
declare module xomega {
    class Header {
        static fieldId: string;
        static fieldText: string;
        static attrPattern: string;
        type: string;
        id: string;
        text: string;
        isValid: boolean;
        isActive: boolean;
        defaultFormat: string;
        attr: any;
        constructor(type: string, id: string, text: string);
        static fromJSON(obj: any): Header;
        toString(fmt?: string): string;
        clone(): Header;
        getAttribute(attribute: string): any;
        addToAttribute(attribute: string, value: any): void;
    }
}
declare module xomega {
    interface ILookupCacheLoader {
        isSupported(tableType: string): boolean;
        load(cache: LookupCache, tableType: string): any;
    }
}
declare module xomega {
    class LookupCache {
        static current: LookupCache;
        static cacheLoaders: Array<ILookupCacheLoader>;
        private cache;
        private notifyQueues;
        private loadLookupTable(type, onReadyCallback);
        getLookupTable(type: string, onReadyCallback?: (type: string) => void): LookupTable;
        removeLookupTable(type: string): void;
        cacheLookupTable(table: LookupTable): void;
    }
}
declare module xomega {
    class LookupTable {
        type: string;
        errors: ErrorList;
        static fromErrors(type: string, errors: ErrorList): LookupTable;
        private caseSensitive;
        private data;
        private indexedData;
        constructor(type: string, data: Array<Header>, caseSensitive: boolean);
        static fromJSON(obj: any): LookupTable;
        getValues(filterFunc?: any, thisArg?: any): Array<Header>;
        lookupById(id: string): Header;
        lookupByFormat(fmt: string, value: string): Header;
        resetIndexes(): void;
        clearIndex(fmt: string): void;
        private buildIndexedTable(format);
    }
}
declare module xomega {
    class XomegaCacheLoader implements ILookupCacheLoader {
        static uriTemplate: string;
        isSupported(tableType: string): boolean;
        load(cache: LookupCache, tableType: string): void;
    }
}
declare module xomega {
    class BaseProperty implements IInitializable {
        private editable;
        private visible;
        private required;
        Parent: KnockoutObservable<DataObject>;
        constructor();
        onInitialized(): void;
        setName(name: string): void;
        Name: string;
        Label: string;
        AccessLevel: KnockoutObservable<AccessLevel>;
        Editable: KnockoutObservable<boolean>;
        Visible: KnockoutObservable<boolean>;
        Required: KnockoutObservable<boolean>;
        toString(): string;
    }
}
declare module xomega {
    interface IInitializable {
        Parent: KnockoutObservable<IDataObject>;
        setName(name: string): any;
        onInitialized(): void;
    }
}
declare module xomega {
    interface IValidatable {
        validate(force: boolean): any;
        ValidationErrors: ErrorList;
    }
}
declare module xomega {
    interface IModifiable {
        Modified: KnockoutObservable<boolean>;
    }
}
declare module xomega {
    interface IDataObject extends IValidatable, IInitializable, IModifiable {
        Editable: KnockoutObservable<boolean>;
        isPropertyEditable(p: BaseProperty): boolean;
        isPropertyRequired(p: BaseProperty): boolean;
        isPropertyVisible(p: BaseProperty): boolean;
    }
}
declare module xomega {
    interface IDataObjectList extends IDataObject {
    }
}
declare module xomega {
    enum AccessLevel {
        None = 0,
        ReadOnly = 1,
        Full = 2,
    }
}
declare module xomega {
    enum ValueFormat {
        Internal = 0,
        Transport = 1,
        EditString = 2,
        DisplayString = 3,
    }
}
declare module xomega {
    class DataProperty extends BaseProperty implements IValidatable, IModifiable {
        static isStringFormat(format: ValueFormat): boolean;
        static isTypedFormat(format: ValueFormat): boolean;
        private value;
        InternalValue: KnockoutObservable<any>;
        DisplayStringValue: KnockoutObservable<any>;
        EditStringValue: KnockoutObservable<any>;
        TransportValue: KnockoutObservable<any>;
        Modified: KnockoutObservable<boolean>;
        constructor();
        onInitialized(): void;
        reset(): void;
        IsMultiValued: boolean;
        NullString: string;
        RestrictedString: string;
        ParseListSeparators: RegExp;
        DisplayListSeparator: string;
        Size: number;
        isValueNull(value: any, format: ValueFormat): boolean;
        isNull(): boolean;
        resolveValue(value: any, format: ValueFormat): any;
        convertValue(value: any, format: ValueFormat): any;
        convertList(list: Array<any>, format: ValueFormat): any;
        isValid(validate?: boolean): boolean;
        ValidationErrors: ErrorList;
        Validated: boolean;
        Validators: Array<Function>;
        validate(force?: boolean): void;
        static validateRequired(dp: DataProperty, value: any): void;
        PossibleValues: KnockoutObservableArray<any>;
        getPossibleValues(): Array<any>;
        updateValueList(): void;
        waitingFor: Array<any>;
        isReady(): boolean;
        addWaitItem(item: any): void;
        removeWaitItem(item: any): void;
    }
}
declare module xomega {
    class DataObject implements IDataObject {
        Parent: KnockoutObservable<DataObject>;
        NameInParent: string;
        AccessLevel: KnockoutObservable<AccessLevel>;
        private editable;
        Editable: KnockoutObservable<boolean>;
        private modified;
        Modified: KnockoutObservable<boolean>;
        constructor();
        init(): void;
        onInitialized(): void;
        setName(name: string): void;
        reset(): void;
        fromJSON(obj: any): void;
        toJSON(contract?: any): any;
        formatUrl(url: string): string;
        toUrlParams(): string;
        fromQueryDict(query: any): void;
        Properties: Array<BaseProperty>;
        isPropertyEditable(prop: BaseProperty): boolean;
        isPropertyVisible(prop: BaseProperty): boolean;
        isPropertyRequired(prop: BaseProperty): boolean;
        ValidationErrors: ErrorList;
        Validated: boolean;
        validate(force?: boolean): void;
        validateSelf(): void;
        private readyCallbacks;
        onReady(callback: () => void): void;
        isReady(): boolean;
        checkIfReady(): void;
        getFieldsCriteria(): Array<FieldCriteria>;
    }
}
declare module xomega {
    class DataRow {
        List: DataListObject;
        constructor(list: DataListObject);
        fromJSON(obj: any): void;
        toJSON(contract?: any): any;
    }
    class DataListObject extends DataObject {
        List: KnockoutObservableArray<DataRow>;
        CriteriaObject: DataObject;
        AppliedCriteria: KnockoutObservableArray<FieldCriteria>;
        private listModified;
        constructor();
        reset(): void;
        fromJSON(obj: any): void;
        toJSON(contract?: any): any;
    }
}
declare module xomega {
    class DataObjectList<T extends DataObject> extends DataObject implements IDataObjectList {
        private objectCreator;
        Template: T;
        List: KnockoutObservableArray<T>;
        private listModified;
        constructor(objectCreator: () => T);
        onInitialized(): void;
        reset(): void;
        fromJSON(obj: any): void;
        isPropertyEditable(prop: BaseProperty): boolean;
        isPropertyVisible(prop: BaseProperty): boolean;
        isPropertyRequired(prop: BaseProperty): boolean;
        validate(force?: boolean): void;
    }
}
declare module xomega {
    class Bindings {
        private static registered;
        static init(): void;
        static register(binding: PropertyBinding): void;
        static findBinding(element: any, property: any): PropertyBinding;
    }
}
declare module xomega {
    class PropertyBinding implements KnockoutBindingHandler {
        appliesTo(element: any, property: any): boolean;
        init(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
        update(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
        handleValidationErrors(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
        setErrorText(element: any, errorText: any): void;
        handleEditable(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
        handleVisible(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
        handleRequired(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
        handleValue(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
        getLabel(element: any): HTMLElement;
        setLabel(element: any, valueAccessor: any): void;
    }
}
declare module xomega {
    class OutputTextBinding extends PropertyBinding {
        appliesTo(element: any, property: any): boolean;
        handleValue(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
    }
}
declare module xomega {
    class InputTextBinding extends PropertyBinding {
        appliesTo(element: any, property: any): boolean;
        init(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
        handleValue(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
    }
}
declare module xomega {
    class CheckboxBinding extends PropertyBinding {
        appliesTo(element: any, property: any): boolean;
        init(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
    }
}
declare module xomega {
    class SelectBinding extends PropertyBinding {
        static DefaultSelectOption: string;
        appliesTo(element: any, property: any): boolean;
        init(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
        handleValue(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
    }
}
declare module xomega {
    class OptionsBinding extends PropertyBinding {
        appliesTo(element: any, property: any): boolean;
        handleValue(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: any): void;
    }
}
declare module xomega {
    class EnumProperty extends DataProperty {
        EnumType: string;
        KeyFormat: string;
        DisplayFormat: string;
        constructor();
        filter(h: Header): boolean;
        compare: (h1: Header, h2: Header) => number;
        private updateValue;
        private updateList;
        convertValue(value: any, format: ValueFormat): any;
        getPossibleValues(): Array<any>;
        private cascadingProperties;
        setCascadingProperty(attribute: string, prop: DataProperty): void;
        matchesCascadingProperties(h: Header): boolean;
    }
}
declare module xomega {
    class OperatorProperty extends EnumProperty {
        private AttributeAddlProps;
        private AttributeMultival;
        private AttributeType;
        private AttributeExcludeType;
        private AttributeSortOrder;
        private AttributeNullCheck;
        AdditionalPropertyName: string;
        AdditionalPropertyName2: string;
        HasNullCheck: boolean;
        constructor();
        onInitialized(): void;
        isApplicable(oper: Header): boolean;
        private typeMatches(prop, name);
        private onValueChanged(newVal);
    }
}
declare module xomega {
    class TextProperty extends DataProperty {
        constructor();
        convertValue(value: any, format: ValueFormat): any;
        static validateSize(dp: DataProperty, value: any): void;
    }
    class GuidProperty extends TextProperty {
        constructor();
    }
}
declare module xomega {
    class BooleanProperty extends DataProperty {
        static TrueStrings: string[];
        static FalseStrings: string[];
        constructor();
        convertValue(value: any, format: ValueFormat): any;
    }
}
declare module xomega {
    class DecimalProperty extends DataProperty {
        MinimumValue: number;
        MaximumValue: number;
        DisplayFormat: string;
        FractionDigits: number;
        constructor();
        convertValue(value: any, fmt: ValueFormat): any;
        static validateNumber(dp: DataProperty, value: any): void;
        static validateMinimum(dp: DecimalProperty, value: any): void;
        static validateMaximum(dp: DecimalProperty, value: any): void;
    }
    class PositiveDecimalProperty extends DecimalProperty {
        constructor();
    }
}
declare module xomega {
    class MoneyProperty extends DecimalProperty {
        static DefaultMoneyFormat: string;
        constructor();
    }
    class PositiveMoneyProperty extends MoneyProperty {
        constructor();
    }
}
declare module xomega {
    class IntegerProperty extends DecimalProperty {
        constructor();
        convertValue(value: any, fmt: ValueFormat): any;
    }
    class PositiveIntegerProperty extends IntegerProperty {
        constructor();
    }
}
declare module xomega {
    class DateTimeProperty extends DataProperty {
        static DefaultEditFormat: string;
        static DefaultFormatOptions: Intl.DateTimeFormatOptions;
        static JsonFormat: string[];
        EditFormat: string;
        Format: Intl.DateTimeFormat;
        FormatOptions: Intl.DateTimeFormatOptions;
        valueType: string;
        constructor();
        convertValue(value: any, fmt: ValueFormat): any;
        static validateDateTime(dp: DateTimeProperty, value: any): void;
    }
}
declare module xomega {
    class DateProperty extends DateTimeProperty {
        static DefaultEditFormat: string;
        constructor();
        convertValue(value: any, fmt: ValueFormat): any;
    }
}
declare module xomega {
    class TimeProperty extends DateTimeProperty {
        static DefaultEditFormat: string;
        MinutesCentric: boolean;
        static JsonFormat: string[];
        constructor();
        convertValue(value: any, fmt: ValueFormat): any;
    }
}
declare module xomega {
    function init(knockout: KnockoutStatic, jQuery: JQueryStatic, momentjs: moment.MomentStatic): void;
}
declare module 'xomega' {
    export = xomega;
}
declare var module: any;
declare var define: RequireDefine;
