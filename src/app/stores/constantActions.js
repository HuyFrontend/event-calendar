

const EVENT_TYPE_NEW = Symbol('EVENT_TYPE_NEW');
const EVENT_TYPE_EDIT = Symbol('EVENT_TYPE_EDIT');
const EVENT_SAVE = Symbol('EVENT_SAVE');
const EVENT_CANCEL = Symbol('EVENT_CANCEL');
const EVENT_ONCHANGE = Symbol('EVENT_ONCHANGE');
const EVENT_DELETE = Symbol('EVENT_DELETE');

const CONSTANT_ACTION = {
    EVENT_TYPE_NEW,
    EVENT_TYPE_EDIT,
    EVENT_CANCEL,
    EVENT_SAVE,
    EVENT_ONCHANGE,
    EVENT_DELETE
};

export default CONSTANT_ACTION;
