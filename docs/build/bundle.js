
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/Button.svelte generated by Svelte v3.48.0 */

    const file$3 = "src/components/Button.svelte";

    function create_fragment$3(ctx) {
    	let main;
    	let p;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			main = element("main");
    			p = element("p");
    			if (default_slot) default_slot.c();
    			attr_dev(p, "class", "svelte-10vp2ph");
    			add_location(p, file$3, 18, 2, 351);
    			set_style(main, "margin", /*center*/ ctx[0] ? '0 auto 0 auto' : '0 auto 0 0');
    			attr_dev(main, "class", "svelte-10vp2ph");
    			add_location(main, file$3, 14, 0, 260);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, p);

    			if (default_slot) {
    				default_slot.m(p, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(main, "click", /*onClick*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*center*/ 1) {
    				set_style(main, "margin", /*center*/ ctx[0] ? '0 auto 0 auto' : '0 auto 0 0');
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	let { click } = $$props;
    	let { center = false } = $$props;

    	function onClick() {
    		if (typeof click === "string") {
    			const link = click;
    			window.open(link);
    		} else {
    			const action = click;
    			action();
    		}
    	}

    	const writable_props = ['click', 'center'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('click' in $$props) $$invalidate(2, click = $$props.click);
    		if ('center' in $$props) $$invalidate(0, center = $$props.center);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ click, center, onClick });

    	$$self.$inject_state = $$props => {
    		if ('click' in $$props) $$invalidate(2, click = $$props.click);
    		if ('center' in $$props) $$invalidate(0, center = $$props.center);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [center, onClick, click, $$scope, slots];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { click: 2, center: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*click*/ ctx[2] === undefined && !('click' in props)) {
    			console.warn("<Button> was created without expected prop 'click'");
    		}
    	}

    	get click() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set click(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get center() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set center(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Logo.svelte generated by Svelte v3.48.0 */

    const file$2 = "src/components/Logo.svelte";

    // (49:2) {#if subtitle != null}
    function create_if_block(ctx) {
    	let p;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(/*subtitle*/ ctx[0]);
    			attr_dev(p, "class", "subtitle svelte-125pj58");
    			set_style(p, "font-size", /*clientWidth*/ ctx[1] / 15 + "px");
    			set_style(p, "transform", "translate(0,-" + /*clientWidth*/ ctx[1] / 30 + "px)");
    			add_location(p, file$2, 49, 4, 20879);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subtitle*/ 1) set_data_dev(t, /*subtitle*/ ctx[0]);

    			if (dirty & /*clientWidth*/ 2) {
    				set_style(p, "font-size", /*clientWidth*/ ctx[1] / 15 + "px");
    			}

    			if (dirty & /*clientWidth*/ 2) {
    				set_style(p, "transform", "translate(0,-" + /*clientWidth*/ ctx[1] / 30 + "px)");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(49:2) {#if subtitle != null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let main;
    	let svg;
    	let path0;
    	let path1;
    	let path2;
    	let path3;
    	let circle;
    	let path4;
    	let path5;
    	let svg_height_value;
    	let t;
    	let main_resize_listener;
    	let if_block = /*subtitle*/ ctx[0] != null && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			path3 = svg_element("path");
    			circle = svg_element("circle");
    			path4 = svg_element("path");
    			path5 = svg_element("path");
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(path0, "class", "corner svelte-125pj58");
    			attr_dev(path0, "d", "M29 179V29H179");
    			attr_dev(path0, "stroke", "#FFE4E1");
    			attr_dev(path0, "stroke-width", "58");
    			add_location(path0, file$2, 12, 4, 267);
    			attr_dev(path1, "class", "corner svelte-125pj58");
    			attr_dev(path1, "d", "M2276 179V29H2126");
    			attr_dev(path1, "stroke", "#FFE4E1");
    			attr_dev(path1, "stroke-width", "58");
    			add_location(path1, file$2, 18, 4, 377);
    			attr_dev(path2, "class", "corner svelte-125pj58");
    			attr_dev(path2, "d", "M29 419V569H179");
    			attr_dev(path2, "stroke", "#FFE4E1");
    			attr_dev(path2, "stroke-width", "58");
    			add_location(path2, file$2, 24, 4, 490);
    			attr_dev(path3, "class", "corner svelte-125pj58");
    			attr_dev(path3, "d", "M2276 419V569H2126");
    			attr_dev(path3, "stroke", "#FFE4E1");
    			attr_dev(path3, "stroke-width", "58");
    			add_location(path3, file$2, 30, 4, 601);
    			attr_dev(circle, "cx", "2143.5");
    			attr_dev(circle, "cy", "434.5");
    			attr_dev(circle, "r", "42.5");
    			attr_dev(circle, "fill", "#FD4242");
    			attr_dev(circle, "class", "svelte-125pj58");
    			add_location(circle, file$2, 36, 4, 715);
    			attr_dev(path4, "class", "shadow svelte-125pj58");
    			attr_dev(path4, "d", "M298.051 494.041C285.438 494.041 274.401 491.361 264.941 486C255.796 480.955 251.224 471.968 251.224 459.039C251.224 450.84 253.274 441.696 257.373 431.605C263.049 437.912 268.252 442.326 272.982 444.849C278.027 447.372 283.388 448.633 289.064 448.633C304.831 448.633 316.498 439.804 324.066 422.145C331.949 404.486 335.891 384.936 335.891 363.493C335.891 323.446 320.913 303.422 290.956 303.422C282.442 303.422 275.189 303.895 269.198 304.841L230.412 486H162.3L226.628 185.172L296.632 175.712L274.401 280.718H277.239C289.222 280.718 300.416 276.934 310.822 269.366C321.228 261.483 329.584 251.707 335.891 240.04C342.198 228.057 345.351 216.075 345.351 204.092C345.351 189.587 340.148 177.446 329.742 167.671C319.651 157.896 304.042 153.008 282.915 153.008C263.68 153.008 244.917 157.423 226.628 166.252C208.339 174.766 193.36 187.695 181.693 205.038C170.341 222.381 164.665 243.351 164.665 267.947C164.665 279.614 165.769 287.813 167.976 292.543C170.183 296.958 171.287 299.48 171.287 300.111C154.574 300.111 141.961 296.8 133.447 290.178C124.933 283.241 120.676 272.046 120.676 256.595C120.676 235.152 128.717 214.813 144.799 195.578C160.881 176.343 182.166 160.891 208.654 149.224C235.142 137.241 263.049 131.25 292.375 131.25C314.448 131.25 333.053 134.719 348.189 141.656C363.325 148.593 374.519 157.738 381.772 169.09C389.34 180.442 393.124 192.898 393.124 206.457C393.124 220.962 389.025 234.995 380.826 248.554C372.627 262.113 360.96 273.15 345.824 281.664C364.744 285.133 378.776 293.962 387.921 308.152C397.066 322.027 401.638 338.582 401.638 357.817C401.638 375.791 398.169 395.342 391.232 416.469C384.61 437.596 373.416 455.886 357.649 471.337C342.198 486.473 322.332 494.041 298.051 494.041ZM474.776 488.838C456.802 488.838 441.823 482.689 429.841 470.391C417.858 458.093 411.867 438.858 411.867 412.685C411.867 389.35 416.439 364.912 425.584 339.37C435.044 313.513 448.918 291.755 467.208 274.096C485.812 256.122 507.886 247.135 533.428 247.135C546.356 247.135 555.974 249.342 562.281 253.757C568.587 258.172 571.741 264.005 571.741 271.258V274.569L576.944 249.5H645.056L611 410.32C609.738 415.05 609.108 420.095 609.108 425.456C609.108 439.015 615.572 445.795 628.501 445.795C637.33 445.795 644.898 441.696 651.205 433.497C657.827 425.298 663.03 414.577 666.814 401.333H686.68C675.012 435.389 660.507 458.566 643.164 470.864C626.136 482.847 608.95 488.838 591.607 488.838C578.363 488.838 567.641 485.212 559.443 477.959C551.559 470.391 546.829 459.512 545.253 445.322C536.108 458.251 525.86 468.814 514.508 477.013C503.471 484.896 490.227 488.838 474.776 488.838ZM505.521 442.957C513.404 442.957 521.13 439.331 528.698 432.078C536.581 424.51 541.942 414.262 544.78 401.333L567.484 294.435C567.484 290.336 565.907 286.394 562.754 282.61C559.6 278.511 554.713 276.461 548.091 276.461C535.477 276.461 524.125 283.871 514.035 298.692C503.944 313.197 496.061 330.856 490.385 351.668C484.709 372.165 481.871 390.296 481.871 406.063C481.871 421.83 484.078 431.92 488.493 436.335C493.223 440.75 498.899 442.957 505.521 442.957ZM720.909 488.838C705.773 488.838 693.002 486 682.596 480.324C672.19 474.333 664.465 466.765 659.419 457.62C654.374 448.16 651.851 438.385 651.851 428.294C651.851 417.888 654.374 408.901 659.419 401.333C664.149 393.45 669.983 387.774 676.92 384.305C689.218 362.232 699.94 340.001 709.084 317.612C718.229 294.908 726.901 270.47 735.099 244.297L805.103 234.837C806.68 275.2 809.36 318.873 813.144 365.858C814.721 384.778 815.509 398.495 815.509 407.009C815.509 426.244 810.622 442.011 800.846 454.309C791.071 466.607 778.931 475.436 764.425 480.797C750.235 486.158 735.73 488.838 720.909 488.838ZM705.773 451.471C717.441 451.471 727.216 448.002 735.099 441.065C742.983 434.128 746.924 422.933 746.924 407.482C746.924 398.022 745.978 384.778 744.086 367.75C740.933 331.802 738.883 307.679 737.937 295.381C730.369 320.292 717.598 350.091 699.624 384.778C706.877 388.562 710.503 394.08 710.503 401.333C710.503 407.324 708.454 412.685 704.354 417.415C700.57 422.145 695.683 424.51 689.691 424.51C683.069 424.51 678.812 422.46 676.92 418.361C676.92 429.713 679.128 438.069 683.542 443.43C688.272 448.791 695.683 451.471 705.773 451.471ZM1125.42 494.041C1100.82 494.041 1088.53 483.477 1088.53 462.35C1088.53 455.413 1089.47 447.529 1091.36 438.7C1093.57 429.555 1096.57 417.888 1100.35 403.698C1104.77 388.877 1108.08 376.264 1110.28 365.858C1112.49 355.452 1113.6 346.15 1113.6 337.951C1113.6 316.508 1104.14 305.787 1085.22 305.787C1079.85 305.787 1074.65 306.418 1069.61 307.679L1031.77 486H963.654L1032.24 164.36C1011.11 173.189 994.715 186.433 983.047 204.092C971.695 221.751 966.019 243.036 966.019 267.947C966.019 279.614 967.123 287.813 969.33 292.543C971.538 296.958 972.641 299.48 972.641 300.111C955.613 300.111 942.842 296.642 934.328 289.705C926.13 282.452 922.03 270.627 922.03 254.23C922.03 234.049 930.229 214.498 946.626 195.578C963.339 176.343 984.624 160.891 1010.48 149.224C1036.34 137.241 1062.2 131.25 1088.05 131.25C1092.47 131.25 1098.77 131.565 1106.97 132.196L1076.23 276.934L1124.95 211.66C1163.73 159.315 1183.28 133.3 1183.6 133.615H1233.26L1101.77 284.975L1118.33 284.502C1139.77 284.502 1154.9 289.074 1163.73 298.219C1172.56 307.048 1176.98 319.346 1176.98 335.113C1176.98 344.258 1175.87 354.033 1173.67 364.439C1171.46 374.53 1168.31 387.143 1164.21 402.279C1161.68 412.054 1159.32 421.672 1157.11 431.132C1154.9 440.592 1153.8 448.475 1153.8 454.782C1153.8 462.035 1155.38 468.499 1158.53 474.175C1162 479.851 1166.57 483.793 1172.25 486C1153.01 491.361 1137.4 494.041 1125.42 494.041ZM1260.03 488.838C1242.06 488.838 1227.08 482.689 1215.09 470.391C1203.11 458.093 1197.12 438.858 1197.12 412.685C1197.12 389.35 1201.69 364.912 1210.84 339.37C1220.3 313.513 1234.17 291.755 1252.46 274.096C1271.07 256.122 1293.14 247.135 1318.68 247.135C1331.61 247.135 1341.23 249.342 1347.53 253.757C1353.84 258.172 1356.99 264.005 1356.99 271.258V274.569L1362.2 249.5H1430.31L1396.25 410.32C1394.99 415.05 1394.36 420.095 1394.36 425.456C1394.36 439.015 1400.83 445.795 1413.75 445.795C1422.58 445.795 1430.15 441.696 1436.46 433.497C1443.08 425.298 1448.28 414.577 1452.07 401.333H1471.93C1460.27 435.389 1445.76 458.566 1428.42 470.864C1411.39 482.847 1394.2 488.838 1376.86 488.838C1363.62 488.838 1352.9 485.212 1344.7 477.959C1336.81 470.391 1332.08 459.512 1330.51 445.322C1321.36 458.251 1311.11 468.814 1299.76 477.013C1288.72 484.896 1275.48 488.838 1260.03 488.838ZM1290.77 442.957C1298.66 442.957 1306.38 439.331 1313.95 432.078C1321.83 424.51 1327.2 414.262 1330.03 401.333L1352.74 294.435C1352.74 290.336 1351.16 286.394 1348.01 282.61C1344.85 278.511 1339.97 276.461 1333.34 276.461C1320.73 276.461 1309.38 283.871 1299.29 298.692C1289.2 313.197 1281.31 330.856 1275.64 351.668C1269.96 372.165 1267.12 390.296 1267.12 406.063C1267.12 421.83 1269.33 431.92 1273.75 436.335C1278.48 440.75 1284.15 442.957 1290.77 442.957ZM1630.09 488.838C1610.54 488.838 1595.72 484.266 1585.63 475.121C1575.54 465.661 1570.49 452.259 1570.49 434.916C1570.49 427.348 1571.44 419.149 1573.33 410.32L1577.11 391.873C1578.37 386.512 1579.01 380.679 1579.01 374.372C1579.01 359.236 1573.33 351.668 1561.98 351.668C1556.93 351.668 1551.57 353.087 1545.9 355.925C1540.53 358.763 1534.23 363.178 1526.98 369.169L1502.38 486H1434.27L1502.85 164.36L1572.86 154.9L1537.38 321.396L1628.67 249.5H1675.5L1580.9 315.247C1585.63 313.986 1590.83 313.355 1596.51 313.355C1613.53 313.355 1626.46 318.558 1635.29 328.964C1644.12 339.37 1648.54 352.614 1648.54 368.696C1648.54 375.318 1647.91 381.309 1646.64 386.67L1641.44 410.32C1639.86 415.996 1639.08 421.041 1639.08 425.456C1639.08 437.123 1645.23 442.957 1657.52 442.957C1666.98 442.957 1674.55 439.646 1680.23 433.024C1685.9 426.087 1691.58 415.523 1697.26 401.333H1717.12C1697.57 459.67 1668.56 488.838 1630.09 488.838ZM1764.69 488.838C1741.36 488.838 1723.23 482.847 1710.3 470.864C1697.37 458.566 1690.91 439.488 1690.91 413.631C1690.91 391.873 1695.16 367.908 1703.68 341.735C1712.19 315.562 1726.07 293.016 1745.3 274.096C1764.54 254.861 1788.98 245.243 1818.62 245.243C1853.3 245.243 1870.65 260.379 1870.65 290.651C1870.65 308.31 1865.6 324.549 1855.51 339.37C1845.42 354.191 1832.02 366.173 1815.31 375.318C1798.59 384.147 1780.78 389.193 1761.86 390.454C1761.23 399.914 1760.91 406.221 1760.91 409.374C1760.91 424.825 1763.59 435.389 1768.95 441.065C1774.31 446.426 1782.98 449.106 1794.97 449.106C1811.99 449.106 1826.5 445.164 1838.48 437.281C1850.78 429.398 1864.18 417.415 1878.69 401.333H1894.77C1859.77 459.67 1816.41 488.838 1764.69 488.838ZM1765.64 367.75C1777.31 367.119 1788.34 363.02 1798.75 355.452C1809.47 347.884 1817.99 338.266 1824.29 326.599C1830.91 314.932 1834.23 302.634 1834.23 289.705C1834.23 276.776 1830.28 270.312 1822.4 270.312C1811.05 270.312 1799.85 280.245 1788.82 300.111C1778.1 319.977 1770.37 342.523 1765.64 367.75ZM1932.51 488.838C1917.37 488.838 1904.6 486 1894.2 480.324C1883.79 474.333 1876.07 466.765 1871.02 457.62C1865.97 448.16 1863.45 438.385 1863.45 428.294C1863.45 417.888 1865.97 408.901 1871.02 401.333C1875.75 393.45 1881.58 387.774 1888.52 384.305C1900.82 362.232 1911.54 340.001 1920.68 317.612C1929.83 294.908 1938.5 270.47 1946.7 244.297L2016.7 234.837C2018.28 275.2 2020.96 318.873 2024.74 365.858C2026.32 384.778 2027.11 398.495 2027.11 407.009C2027.11 426.244 2022.22 442.011 2012.45 454.309C2002.67 466.607 1990.53 475.436 1976.03 480.797C1961.84 486.158 1947.33 488.838 1932.51 488.838ZM1917.37 451.471C1929.04 451.471 1938.82 448.002 1946.7 441.065C1954.58 434.128 1958.52 422.933 1958.52 407.482C1958.52 398.022 1957.58 384.778 1955.69 367.75C1952.53 331.802 1950.48 307.679 1949.54 295.381C1941.97 320.292 1929.2 350.091 1911.22 384.778C1918.48 388.562 1922.1 394.08 1922.1 401.333C1922.1 407.324 1920.05 412.685 1915.95 417.415C1912.17 422.145 1907.28 424.51 1901.29 424.51C1894.67 424.51 1890.41 422.46 1888.52 418.361C1888.52 429.713 1890.73 438.069 1895.14 443.43C1899.87 448.791 1907.28 451.471 1917.37 451.471Z");
    			attr_dev(path4, "fill", "#FF8989");
    			add_location(path4, file$2, 37, 4, 777);
    			attr_dev(path5, "class", "text svelte-125pj58");
    			attr_dev(path5, "d", "M322.051 479.041C309.438 479.041 298.401 476.361 288.941 471C279.796 465.955 275.224 456.968 275.224 444.039C275.224 435.84 277.274 426.696 281.373 416.605C287.049 422.912 292.252 427.326 296.982 429.849C302.027 432.372 307.388 433.633 313.064 433.633C328.831 433.633 340.498 424.804 348.066 407.145C355.949 389.486 359.891 369.936 359.891 348.493C359.891 308.446 344.913 288.422 314.956 288.422C306.442 288.422 299.189 288.895 293.198 289.841L254.412 471H186.3L250.628 170.172L320.632 160.712L298.401 265.718H301.239C313.222 265.718 324.416 261.934 334.822 254.366C345.228 246.483 353.584 236.707 359.891 225.04C366.198 213.057 369.351 201.075 369.351 189.092C369.351 174.587 364.148 162.446 353.742 152.671C343.651 142.896 328.042 138.008 306.915 138.008C287.68 138.008 268.917 142.423 250.628 151.252C232.339 159.766 217.36 172.695 205.693 190.038C194.341 207.381 188.665 228.351 188.665 252.947C188.665 264.614 189.769 272.813 191.976 277.543C194.183 281.958 195.287 284.48 195.287 285.111C178.574 285.111 165.961 281.8 157.447 275.178C148.933 268.241 144.676 257.046 144.676 241.595C144.676 220.152 152.717 199.813 168.799 180.578C184.881 161.343 206.166 145.891 232.654 134.224C259.142 122.241 287.049 116.25 316.375 116.25C338.448 116.25 357.053 119.719 372.189 126.656C387.325 133.593 398.519 142.738 405.772 154.09C413.34 165.442 417.124 177.898 417.124 191.457C417.124 205.962 413.025 219.995 404.826 233.554C396.627 247.113 384.96 258.15 369.824 266.664C388.744 270.133 402.776 278.962 411.921 293.152C421.066 307.027 425.638 323.582 425.638 342.817C425.638 360.791 422.169 380.342 415.232 401.469C408.61 422.596 397.416 440.886 381.649 456.337C366.198 471.473 346.332 479.041 322.051 479.041ZM498.776 473.838C480.802 473.838 465.823 467.689 453.841 455.391C441.858 443.093 435.867 423.858 435.867 397.685C435.867 374.35 440.439 349.912 449.584 324.37C459.044 298.513 472.918 276.755 491.208 259.096C509.812 241.122 531.886 232.135 557.428 232.135C570.356 232.135 579.974 234.342 586.281 238.757C592.587 243.172 595.741 249.005 595.741 256.258V259.569L600.944 234.5H669.056L635 395.32C633.738 400.05 633.108 405.095 633.108 410.456C633.108 424.015 639.572 430.795 652.501 430.795C661.33 430.795 668.898 426.696 675.205 418.497C681.827 410.298 687.03 399.577 690.814 386.333H710.68C699.012 420.389 684.507 443.566 667.164 455.864C650.136 467.847 632.95 473.838 615.607 473.838C602.363 473.838 591.641 470.212 583.443 462.959C575.559 455.391 570.829 444.512 569.253 430.322C560.108 443.251 549.86 453.814 538.508 462.013C527.471 469.896 514.227 473.838 498.776 473.838ZM529.521 427.957C537.404 427.957 545.13 424.331 552.698 417.078C560.581 409.51 565.942 399.262 568.78 386.333L591.484 279.435C591.484 275.336 589.907 271.394 586.754 267.61C583.6 263.511 578.713 261.461 572.091 261.461C559.477 261.461 548.125 268.871 538.035 283.692C527.944 298.197 520.061 315.856 514.385 336.668C508.709 357.165 505.871 375.296 505.871 391.063C505.871 406.83 508.078 416.92 512.493 421.335C517.223 425.75 522.899 427.957 529.521 427.957ZM744.909 473.838C729.773 473.838 717.002 471 706.596 465.324C696.19 459.333 688.465 451.765 683.419 442.62C678.374 433.16 675.851 423.385 675.851 413.294C675.851 402.888 678.374 393.901 683.419 386.333C688.149 378.45 693.983 372.774 700.92 369.305C713.218 347.232 723.94 325.001 733.084 302.612C742.229 279.908 750.901 255.47 759.099 229.297L829.103 219.837C830.68 260.2 833.36 303.873 837.144 350.858C838.721 369.778 839.509 383.495 839.509 392.009C839.509 411.244 834.622 427.011 824.846 439.309C815.071 451.607 802.931 460.436 788.425 465.797C774.235 471.158 759.73 473.838 744.909 473.838ZM729.773 436.471C741.441 436.471 751.216 433.002 759.099 426.065C766.983 419.128 770.924 407.933 770.924 392.482C770.924 383.022 769.978 369.778 768.086 352.75C764.933 316.802 762.883 292.679 761.937 280.381C754.369 305.292 741.598 335.091 723.624 369.778C730.877 373.562 734.503 379.08 734.503 386.333C734.503 392.324 732.454 397.685 728.354 402.415C724.57 407.145 719.683 409.51 713.691 409.51C707.069 409.51 702.812 407.46 700.92 403.361C700.92 414.713 703.128 423.069 707.542 428.43C712.272 433.791 719.683 436.471 729.773 436.471ZM1149.42 479.041C1124.82 479.041 1112.53 468.477 1112.53 447.35C1112.53 440.413 1113.47 432.529 1115.36 423.7C1117.57 414.555 1120.57 402.888 1124.35 388.698C1128.77 373.877 1132.08 361.264 1134.28 350.858C1136.49 340.452 1137.6 331.15 1137.6 322.951C1137.6 301.508 1128.14 290.787 1109.22 290.787C1103.85 290.787 1098.65 291.418 1093.61 292.679L1055.77 471H987.654L1056.24 149.36C1035.11 158.189 1018.71 171.433 1007.05 189.092C995.695 206.751 990.019 228.036 990.019 252.947C990.019 264.614 991.123 272.813 993.33 277.543C995.538 281.958 996.641 284.48 996.641 285.111C979.613 285.111 966.842 281.642 958.328 274.705C950.13 267.452 946.03 255.627 946.03 239.23C946.03 219.049 954.229 199.498 970.626 180.578C987.339 161.343 1008.62 145.891 1034.48 134.224C1060.34 122.241 1086.2 116.25 1112.05 116.25C1116.47 116.25 1122.77 116.565 1130.97 117.196L1100.23 261.934L1148.95 196.66C1187.73 144.315 1207.28 118.3 1207.6 118.615H1257.26L1125.77 269.975L1142.33 269.502C1163.77 269.502 1178.9 274.074 1187.73 283.219C1196.56 292.048 1200.98 304.346 1200.98 320.113C1200.98 329.258 1199.87 339.033 1197.67 349.439C1195.46 359.53 1192.31 372.143 1188.21 387.279C1185.68 397.054 1183.32 406.672 1181.11 416.132C1178.9 425.592 1177.8 433.475 1177.8 439.782C1177.8 447.035 1179.38 453.499 1182.53 459.175C1186 464.851 1190.57 468.793 1196.25 471C1177.01 476.361 1161.4 479.041 1149.42 479.041ZM1284.03 473.838C1266.06 473.838 1251.08 467.689 1239.09 455.391C1227.11 443.093 1221.12 423.858 1221.12 397.685C1221.12 374.35 1225.69 349.912 1234.84 324.37C1244.3 298.513 1258.17 276.755 1276.46 259.096C1295.07 241.122 1317.14 232.135 1342.68 232.135C1355.61 232.135 1365.23 234.342 1371.53 238.757C1377.84 243.172 1380.99 249.005 1380.99 256.258V259.569L1386.2 234.5H1454.31L1420.25 395.32C1418.99 400.05 1418.36 405.095 1418.36 410.456C1418.36 424.015 1424.83 430.795 1437.75 430.795C1446.58 430.795 1454.15 426.696 1460.46 418.497C1467.08 410.298 1472.28 399.577 1476.07 386.333H1495.93C1484.27 420.389 1469.76 443.566 1452.42 455.864C1435.39 467.847 1418.2 473.838 1400.86 473.838C1387.62 473.838 1376.9 470.212 1368.7 462.959C1360.81 455.391 1356.08 444.512 1354.51 430.322C1345.36 443.251 1335.11 453.814 1323.76 462.013C1312.72 469.896 1299.48 473.838 1284.03 473.838ZM1314.77 427.957C1322.66 427.957 1330.38 424.331 1337.95 417.078C1345.83 409.51 1351.2 399.262 1354.03 386.333L1376.74 279.435C1376.74 275.336 1375.16 271.394 1372.01 267.61C1368.85 263.511 1363.97 261.461 1357.34 261.461C1344.73 261.461 1333.38 268.871 1323.29 283.692C1313.2 298.197 1305.31 315.856 1299.64 336.668C1293.96 357.165 1291.12 375.296 1291.12 391.063C1291.12 406.83 1293.33 416.92 1297.75 421.335C1302.48 425.75 1308.15 427.957 1314.77 427.957ZM1654.09 473.838C1634.54 473.838 1619.72 469.266 1609.63 460.121C1599.54 450.661 1594.49 437.259 1594.49 419.916C1594.49 412.348 1595.44 404.149 1597.33 395.32L1601.11 376.873C1602.37 371.512 1603.01 365.679 1603.01 359.372C1603.01 344.236 1597.33 336.668 1585.98 336.668C1580.93 336.668 1575.57 338.087 1569.9 340.925C1564.53 343.763 1558.23 348.178 1550.98 354.169L1526.38 471H1458.27L1526.85 149.36L1596.86 139.9L1561.38 306.396L1652.67 234.5H1699.5L1604.9 300.247C1609.63 298.986 1614.83 298.355 1620.51 298.355C1637.53 298.355 1650.46 303.558 1659.29 313.964C1668.12 324.37 1672.54 337.614 1672.54 353.696C1672.54 360.318 1671.91 366.309 1670.64 371.67L1665.44 395.32C1663.86 400.996 1663.08 406.041 1663.08 410.456C1663.08 422.123 1669.23 427.957 1681.52 427.957C1690.98 427.957 1698.55 424.646 1704.23 418.024C1709.9 411.087 1715.58 400.523 1721.26 386.333H1741.12C1721.57 444.67 1692.56 473.838 1654.09 473.838ZM1788.69 473.838C1765.36 473.838 1747.23 467.847 1734.3 455.864C1721.37 443.566 1714.91 424.488 1714.91 398.631C1714.91 376.873 1719.16 352.908 1727.68 326.735C1736.19 300.562 1750.07 278.016 1769.3 259.096C1788.54 239.861 1812.98 230.243 1842.62 230.243C1877.3 230.243 1894.65 245.379 1894.65 275.651C1894.65 293.31 1889.6 309.549 1879.51 324.37C1869.42 339.191 1856.02 351.173 1839.31 360.318C1822.59 369.147 1804.78 374.193 1785.86 375.454C1785.23 384.914 1784.91 391.221 1784.91 394.374C1784.91 409.825 1787.59 420.389 1792.95 426.065C1798.31 431.426 1806.98 434.106 1818.97 434.106C1835.99 434.106 1850.5 430.164 1862.48 422.281C1874.78 414.398 1888.18 402.415 1902.69 386.333H1918.77C1883.77 444.67 1840.41 473.838 1788.69 473.838ZM1789.64 352.75C1801.31 352.119 1812.34 348.02 1822.75 340.452C1833.47 332.884 1841.99 323.266 1848.29 311.599C1854.91 299.932 1858.23 287.634 1858.23 274.705C1858.23 261.776 1854.28 255.312 1846.4 255.312C1835.05 255.312 1823.85 265.245 1812.82 285.111C1802.1 304.977 1794.37 327.523 1789.64 352.75ZM1956.51 473.838C1941.37 473.838 1928.6 471 1918.2 465.324C1907.79 459.333 1900.07 451.765 1895.02 442.62C1889.97 433.16 1887.45 423.385 1887.45 413.294C1887.45 402.888 1889.97 393.901 1895.02 386.333C1899.75 378.45 1905.58 372.774 1912.52 369.305C1924.82 347.232 1935.54 325.001 1944.68 302.612C1953.83 279.908 1962.5 255.47 1970.7 229.297L2040.7 219.837C2042.28 260.2 2044.96 303.873 2048.74 350.858C2050.32 369.778 2051.11 383.495 2051.11 392.009C2051.11 411.244 2046.22 427.011 2036.45 439.309C2026.67 451.607 2014.53 460.436 2000.03 465.797C1985.84 471.158 1971.33 473.838 1956.51 473.838ZM1941.37 436.471C1953.04 436.471 1962.82 433.002 1970.7 426.065C1978.58 419.128 1982.52 407.933 1982.52 392.482C1982.52 383.022 1981.58 369.778 1979.69 352.75C1976.53 316.802 1974.48 292.679 1973.54 280.381C1965.97 305.292 1953.2 335.091 1935.22 369.778C1942.48 373.562 1946.1 379.08 1946.1 386.333C1946.1 392.324 1944.05 397.685 1939.95 402.415C1936.17 407.145 1931.28 409.51 1925.29 409.51C1918.67 409.51 1914.41 407.46 1912.52 403.361C1912.52 414.713 1914.73 423.069 1919.14 428.43C1923.87 433.791 1931.28 436.471 1941.37 436.471Z");
    			attr_dev(path5, "fill", "#545454");
    			add_location(path5, file$2, 42, 4, 10812);
    			attr_dev(svg, "width", /*clientWidth*/ ctx[1]);
    			attr_dev(svg, "height", svg_height_value = /*clientWidth*/ ctx[1] * 598 / 2305);
    			attr_dev(svg, "viewBox", "0 0 2305 598");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$2, 5, 2, 108);
    			add_render_callback(() => /*main_elementresize_handler*/ ctx[2].call(main));
    			add_location(main, file$2, 4, 0, 82);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, svg);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    			append_dev(svg, path3);
    			append_dev(svg, circle);
    			append_dev(svg, path4);
    			append_dev(svg, path5);
    			append_dev(main, t);
    			if (if_block) if_block.m(main, null);
    			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[2].bind(main));
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*clientWidth*/ 2) {
    				attr_dev(svg, "width", /*clientWidth*/ ctx[1]);
    			}

    			if (dirty & /*clientWidth*/ 2 && svg_height_value !== (svg_height_value = /*clientWidth*/ ctx[1] * 598 / 2305)) {
    				attr_dev(svg, "height", svg_height_value);
    			}

    			if (/*subtitle*/ ctx[0] != null) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(main, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block) if_block.d();
    			main_resize_listener();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let clientWidth;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Logo', slots, []);
    	let { subtitle = undefined } = $$props;
    	const writable_props = ['subtitle'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Logo> was created with unknown prop '${key}'`);
    	});

    	function main_elementresize_handler() {
    		clientWidth = this.clientWidth;
    		$$invalidate(1, clientWidth);
    	}

    	$$self.$$set = $$props => {
    		if ('subtitle' in $$props) $$invalidate(0, subtitle = $$props.subtitle);
    	};

    	$$self.$capture_state = () => ({ subtitle, clientWidth });

    	$$self.$inject_state = $$props => {
    		if ('subtitle' in $$props) $$invalidate(0, subtitle = $$props.subtitle);
    		if ('clientWidth' in $$props) $$invalidate(1, clientWidth = $$props.clientWidth);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(1, clientWidth = 0);
    	return [subtitle, clientWidth, main_elementresize_handler];
    }

    class Logo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { subtitle: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Logo",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get subtitle() {
    		throw new Error("<Logo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subtitle(value) {
    		throw new Error("<Logo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Vimeo.svelte generated by Svelte v3.48.0 */

    const file$1 = "src/components/Vimeo.svelte";

    function create_fragment$1(ctx) {
    	let main;
    	let div;
    	let iframe;
    	let iframe_src_value;
    	let t;
    	let script;
    	let script_src_value;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			iframe = element("iframe");
    			t = space();
    			script = element("script");
    			if (!src_url_equal(iframe.src, iframe_src_value = "https://player.vimeo.com/video/139269807?h=a16d8c8b14&badge=0&autopause=0&player_id=0&app_id=58479")) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "frameborder", "0");
    			attr_dev(iframe, "allow", "autoplay; fullscreen; picture-in-picture");
    			iframe.allowFullscreen = true;
    			set_style(iframe, "position", "absolute");
    			set_style(iframe, "top", "0");
    			set_style(iframe, "left", "0");
    			set_style(iframe, "width", "100%");
    			set_style(iframe, "height", "100%");
    			attr_dev(iframe, "title", "Showreel Bas Kakes");
    			add_location(iframe, file$1, 5, 4, 110);
    			set_style(div, "padding", "56.25% 0 0 0");
    			set_style(div, "position", "relative");
    			add_location(div, file$1, 4, 2, 52);
    			if (!src_url_equal(script.src, script_src_value = "https://player.vimeo.com/api/player.js")) attr_dev(script, "src", script_src_value);
    			add_location(script, file$1, 14, 2, 464);
    			add_location(main, file$1, 3, 0, 43);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(div, iframe);
    			append_dev(main, t);
    			append_dev(main, script);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Vimeo', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Vimeo> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Vimeo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Vimeo",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.48.0 */

    const { window: window_1 } = globals;
    const file = "src/App.svelte";

    // (39:4) <Button center={true} click={onClickPortfolio}>
    function create_default_slot_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Bekijk mijn portfolio");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(39:4) <Button center={true} click={onClickPortfolio}>",
    		ctx
    	});

    	return block;
    }

    // (149:4) <Button click="mailto:info@baskakes.nl?subject=Samenwerken aan project"       >
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Mail mij");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(149:4) <Button click=\\\"mailto:info@baskakes.nl?subject=Samenwerken aan project\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (152:4) <Button click="https://www.linkedin.com/in/bas-kakes/">
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("LinkedIn");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(152:4) <Button click=\\\"https://www.linkedin.com/in/bas-kakes/\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let logo;
    	let t0;
    	let content;
    	let badgeContainer;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let space_1;
    	let t2;
    	let quote_1;
    	let p0;
    	let t4;
    	let button0;
    	let t5;
    	let h20;
    	let t7;
    	let vimeo;
    	let t8;
    	let p1;
    	let t10;
    	let p2;
    	let t12;
    	let p3;
    	let t14;
    	let h21;
    	let t16;
    	let p4;
    	let t18;
    	let h22;
    	let t20;
    	let p5;
    	let t22;
    	let h30;
    	let t24;
    	let p6;
    	let t25;
    	let a0;
    	let t27;
    	let a1;
    	let t29;
    	let t30;
    	let img1;
    	let img1_src_value;
    	let t31;
    	let a2;
    	let t33;
    	let a3;
    	let t35;
    	let h31;
    	let t37;
    	let p7;
    	let t38;
    	let i;
    	let t40;
    	let t41;
    	let a4;
    	let t43;
    	let a5;
    	let t45;
    	let h32;
    	let t47;
    	let p8;
    	let t49;
    	let a6;
    	let t51;
    	let h33;
    	let t53;
    	let p9;
    	let t55;
    	let img2;
    	let img2_src_value;
    	let t56;
    	let img3;
    	let img3_src_value;
    	let t57;
    	let p10;
    	let t59;
    	let spacer;
    	let t60;
    	let button1;
    	let t61;
    	let button2;
    	let t62;
    	let video;
    	let video_src_value;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[5]);

    	logo = new Logo({
    			props: { subtitle: "brengt het in beeld" },
    			$$inline: true
    		});

    	button0 = new Button({
    			props: {
    				center: true,
    				click: onClickPortfolio,
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	vimeo = new Vimeo({ $$inline: true });

    	button1 = new Button({
    			props: {
    				click: "mailto:info@baskakes.nl?subject=Samenwerken aan project",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button2 = new Button({
    			props: {
    				click: "https://www.linkedin.com/in/bas-kakes/",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(logo.$$.fragment);
    			t0 = space();
    			content = element("content");
    			badgeContainer = element("badgeContainer");
    			img0 = element("img");
    			t1 = space();
    			space_1 = element("space");
    			t2 = space();
    			quote_1 = element("quote");
    			p0 = element("p");
    			p0.textContent = `${/*quote*/ ctx[3]}`;
    			t4 = space();
    			create_component(button0.$$.fragment);
    			t5 = space();
    			h20 = element("h2");
    			h20.textContent = "Showreel";
    			t7 = space();
    			create_component(vimeo.$$.fragment);
    			t8 = space();
    			p1 = element("p");
    			p1.textContent = "Voor mij moet het modern, visueel verantwoord en technisch perfect zijn;\n      de kijker moet voelen wat ik voel. En dat geldt ook voor de mensen waarmee\n      ik werk, want mijn kracht en passie komen bijeen door samen te werken aan\n      prachtige filmprojecten.";
    			t10 = space();
    			p2 = element("p");
    			p2.textContent = "Ik ben filmregisseur, cameraman, en video-editor.";
    			t12 = space();
    			p3 = element("p");
    			p3.textContent = "Al van kleins af aan trommelde ik de hele buurt op om in mijn ‘films’ te\n      spelen. Toen was ik al begonnen mezelf te ontwikkelen, en nog steeds leg\n      ik de lat keer op keer hoger. Na een studie met specialisatie tot\n      cameraman en video-editor (afgerond in 2015) was de basis gelegd om\n      professionele projecten te kunnen realiseren.";
    			t14 = space();
    			h21 = element("h2");
    			h21.textContent = "Ter land, ter zee en in de lucht";
    			t16 = space();
    			p4 = element("p");
    			p4.textContent = "Ik zorg dat ik met mijn camera op de juiste plaats en om de juiste tijd\n      aanwezig ben om de mooiste shots te maken. Het vliegen met een drone of\n      het maken van een duik in het water kunnen die unieke beelden opleveren\n      die nodig zijn om het verhaal goed in beeld te brengen. Natuurlijk ben ik\n      gecertificeerd bij de EASA op A1-A3 en A2-niveau voor het vliegen met de\n      drone en bij PADI als Open Water Diver; rekening houden met veiligheid en\n      lokale regelgeving zijn voor mij belangrijk.";
    			t18 = space();
    			h22 = element("h2");
    			h22.textContent = "Portfolio";
    			t20 = space();
    			p5 = element("p");
    			p5.textContent = "Dit zijn enkele van mijn afgeronde projecten.";
    			t22 = space();
    			h30 = element("h3");
    			h30.textContent = "Dordrecht door de jaren heen";
    			t24 = space();
    			p6 = element("p");
    			t25 = text("Een documentaire over de stad waar ik vandaan kom. Deze film heb ik samen\n      met mijn neef ");
    			a0 = element("a");
    			a0.textContent = "Coen Koopmans";
    			t27 = text("\n      en goede vriend\n      ");
    			a1 = element("a");
    			a1.textContent = "Kevin van den Hoek";
    			t29 = text(" gemaakt. Het begon met het enorme enthousiasme voor Dordrecht van de opa\n      van Coen en mijzelf. Dit wilde ik onderzoeken en is uitgedraaid tot een bioscoopfilm\n      over de stad.");
    			t30 = space();
    			img1 = element("img");
    			t31 = space();
    			a2 = element("a");
    			a2.textContent = "Meer over Dordrecht door de jaren heen";
    			t33 = space();
    			a3 = element("a");
    			a3.textContent = "In het AD";
    			t35 = space();
    			h31 = element("h3");
    			h31.textContent = "BMW Nederland";
    			t37 = space();
    			p7 = element("p");
    			t38 = text("Voor BMW maak ik diverse films van speciale evenementen die ze verzorgen. ");
    			i = element("i");
    			i.textContent = "BMW Privileges";
    			t40 = text(" (een programma voor klanten) biedt meerdere evenementen aan voor BMW-rijders.\n      Dit varieert van luxe dinertjes tot het racen op Circuit Zandvoort. Zo’n evenement\n      wordt door mij vastgelegd en verwerkt in een korte film.");
    			t41 = space();
    			a4 = element("a");
    			a4.textContent = "Bekijk mijn werk voor BMW Nederland";
    			t43 = space();
    			a5 = element("a");
    			a5.textContent = "Bekijk mijn werk voor MINI Nederland";
    			t45 = space();
    			h32 = element("h3");
    			h32.textContent = "Rijkswaterstaat";
    			t47 = space();
    			p8 = element("p");
    			p8.textContent = "Voor Rijkswaterstaat ben ik bezig geweest om diverse onderdelen in het\n      bedrijf in beeld te brengen om begrip tussen afdelingen te vergroten.";
    			t49 = space();
    			a6 = element("a");
    			a6.textContent = "Bekijk mijn werk voor Rijkswaterstaat";
    			t51 = space();
    			h33 = element("h3");
    			h33.textContent = "De Biesbosch: Grootse natuur in een klein land";
    			t53 = space();
    			p9 = element("p");
    			p9.textContent = "De Biesbosch is een prachtig gebied en ligt praktisch in mijn achtertuin.\n      Een uniek gebied waar ik graag ben en meer over te weten wil komen. Samen\n      met onder andere Jacques van der Neut (oud-boswachter van de Biesbosch)\n      maak ik een film over dit prachtige gebied.";
    			t55 = space();
    			img2 = element("img");
    			t56 = space();
    			img3 = element("img");
    			t57 = space();
    			p10 = element("p");
    			p10.textContent = "Natuurlijk ben ik beschikbaar voor onder ander bedrijfsvideo’s,\n      commercials, videoclips en allerlei andere videoklussen. Zullen we\n      samenwerken aan uw project?";
    			t59 = space();
    			spacer = element("spacer");
    			t60 = space();
    			create_component(button1.$$.fragment);
    			t61 = space();
    			create_component(button2.$$.fragment);
    			t62 = space();
    			video = element("video");
    			attr_dev(img0, "class", "badge svelte-1huogsc");
    			if (!src_url_equal(img0.src, img0_src_value = "./assets/images/bas-kakes.jpg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "Foto van Bas Kakes");
    			add_location(img0, file, 30, 6, 1070);
    			attr_dev(badgeContainer, "class", "svelte-1huogsc");
    			add_location(badgeContainer, file, 29, 4, 1047);
    			add_location(space_1, file, 36, 4, 1209);
    			attr_dev(p0, "class", "svelte-1huogsc");
    			add_location(p0, file, 37, 11, 1230);
    			attr_dev(quote_1, "class", "svelte-1huogsc");
    			add_location(quote_1, file, 37, 4, 1223);
    			attr_dev(h20, "class", "reel svelte-1huogsc");
    			add_location(h20, file, 40, 4, 1344);
    			add_location(p1, file, 42, 4, 1393);
    			attr_dev(p2, "class", "bold");
    			add_location(p2, file, 48, 4, 1681);
    			add_location(p3, file, 49, 4, 1755);
    			attr_dev(h21, "class", "svelte-1huogsc");
    			add_location(h21, file, 56, 4, 2128);
    			add_location(p4, file, 57, 4, 2174);
    			attr_dev(h22, "id", "portfolio");
    			attr_dev(h22, "class", "svelte-1huogsc");
    			add_location(h22, file, 66, 4, 2715);
    			add_location(p5, file, 67, 4, 2753);
    			attr_dev(h30, "class", "svelte-1huogsc");
    			add_location(h30, file, 68, 4, 2810);
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", "https://www.linkedin.com/in/coen-koopmans-3b15519a/");
    			add_location(a0, file, 71, 20, 2956);
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", "https://www.linkedin.com/in/kevin-van-den-hoek-9302b8145/");
    			add_location(a1, file, 77, 6, 3112);
    			add_location(p6, file, 69, 4, 2852);
    			attr_dev(img1, "class", "photo svelte-1huogsc");
    			attr_dev(img1, "alt", "Foto van première Dordrecht door de jaren heen.");
    			if (!src_url_equal(img1.src, img1_src_value = "./assets/images/dordrecht-door-de-jaren-heen-premiere.jpg")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 85, 4, 3448);
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", "https://www.dordtfilm.nl/");
    			add_location(a2, file, 90, 4, 3614);
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "href", "https://www.ad.nl/dordrecht/corona-gooide-eerder-roet-in-het-eten-maar-dordt-docu-is-straks-echt-te-zien-in-de-bioscoop~a26842e3/");
    			add_location(a3, file, 93, 4, 3725);
    			attr_dev(h31, "class", "svelte-1huogsc");
    			add_location(h31, file, 98, 4, 3923);
    			add_location(i, file, 100, 80, 4046);
    			attr_dev(p7, "class", "bmw svelte-1huogsc");
    			add_location(p7, file, 99, 4, 3950);
    			attr_dev(a4, "target", "_blank");
    			attr_dev(a4, "href", "https://www.bmw.nl/nl/content/aftersales/privileges/privileges.html#");
    			add_location(a4, file, 106, 4, 4327);
    			attr_dev(a5, "target", "_blank");
    			attr_dev(a5, "href", "https://www.mini.nl/nl_NL/home/nog-meer-mini/mini-favours.html");
    			add_location(a5, file, 111, 4, 4490);
    			attr_dev(h32, "class", "svelte-1huogsc");
    			add_location(h32, file, 116, 4, 4648);
    			add_location(p8, file, 117, 4, 4677);
    			attr_dev(a6, "target", "_blank");
    			attr_dev(a6, "href", "https://www.youtube.com/watch?v=r2gcHdI4AJY");
    			add_location(a6, file, 121, 4, 4847);
    			attr_dev(h33, "class", "svelte-1huogsc");
    			add_location(h33, file, 124, 4, 4975);
    			add_location(p9, file, 125, 4, 5035);
    			attr_dev(img2, "class", "photo svelte-1huogsc");
    			attr_dev(img2, "alt", "Foto van camera van Bas");
    			if (!src_url_equal(img2.src, img2_src_value = "./assets/images/biesbosch-camera.jpg")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 131, 4, 5340);
    			attr_dev(img3, "class", "photo svelte-1huogsc");
    			attr_dev(img3, "alt", "Foto van Bas met camera");
    			if (!src_url_equal(img3.src, img3_src_value = "./assets/images/bas-kakes-biesbosch.jpg")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 136, 4, 5461);
    			add_location(p10, file, 142, 4, 5586);
    			attr_dev(spacer, "class", "svelte-1huogsc");
    			add_location(spacer, file, 147, 4, 5780);
    			attr_dev(content, "class", "svelte-1huogsc");
    			add_location(content, file, 28, 2, 1033);
    			attr_dev(video, "preload", "none");
    			if (!src_url_equal(video.src, video_src_value = /*videoUrl*/ ctx[1])) attr_dev(video, "src", video_src_value);
    			video.autoplay = true;
    			video.muted = true;
    			video.loop = true;
    			attr_dev(video, "class", "svelte-1huogsc");
    			add_location(video, file, 153, 2, 5989);
    			set_style(main, "width", /*width*/ ctx[2] + "px");
    			attr_dev(main, "class", "svelte-1huogsc");
    			add_location(main, file, 26, 0, 958);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(logo, main, null);
    			append_dev(main, t0);
    			append_dev(main, content);
    			append_dev(content, badgeContainer);
    			append_dev(badgeContainer, img0);
    			append_dev(content, t1);
    			append_dev(content, space_1);
    			append_dev(content, t2);
    			append_dev(content, quote_1);
    			append_dev(quote_1, p0);
    			append_dev(content, t4);
    			mount_component(button0, content, null);
    			append_dev(content, t5);
    			append_dev(content, h20);
    			append_dev(content, t7);
    			mount_component(vimeo, content, null);
    			append_dev(content, t8);
    			append_dev(content, p1);
    			append_dev(content, t10);
    			append_dev(content, p2);
    			append_dev(content, t12);
    			append_dev(content, p3);
    			append_dev(content, t14);
    			append_dev(content, h21);
    			append_dev(content, t16);
    			append_dev(content, p4);
    			append_dev(content, t18);
    			append_dev(content, h22);
    			append_dev(content, t20);
    			append_dev(content, p5);
    			append_dev(content, t22);
    			append_dev(content, h30);
    			append_dev(content, t24);
    			append_dev(content, p6);
    			append_dev(p6, t25);
    			append_dev(p6, a0);
    			append_dev(p6, t27);
    			append_dev(p6, a1);
    			append_dev(p6, t29);
    			append_dev(content, t30);
    			append_dev(content, img1);
    			append_dev(content, t31);
    			append_dev(content, a2);
    			append_dev(content, t33);
    			append_dev(content, a3);
    			append_dev(content, t35);
    			append_dev(content, h31);
    			append_dev(content, t37);
    			append_dev(content, p7);
    			append_dev(p7, t38);
    			append_dev(p7, i);
    			append_dev(p7, t40);
    			append_dev(content, t41);
    			append_dev(content, a4);
    			append_dev(content, t43);
    			append_dev(content, a5);
    			append_dev(content, t45);
    			append_dev(content, h32);
    			append_dev(content, t47);
    			append_dev(content, p8);
    			append_dev(content, t49);
    			append_dev(content, a6);
    			append_dev(content, t51);
    			append_dev(content, h33);
    			append_dev(content, t53);
    			append_dev(content, p9);
    			append_dev(content, t55);
    			append_dev(content, img2);
    			append_dev(content, t56);
    			append_dev(content, img3);
    			append_dev(content, t57);
    			append_dev(content, p10);
    			append_dev(content, t59);
    			append_dev(content, spacer);
    			append_dev(content, t60);
    			mount_component(button1, content, null);
    			append_dev(content, t61);
    			mount_component(button2, content, null);
    			append_dev(main, t62);
    			append_dev(main, video);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1, "resize", /*onResize*/ ctx[4], false, false, false),
    					listen_dev(window_1, "resize", /*onwindowresize*/ ctx[5])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const button2_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				button2_changes.$$scope = { dirty, ctx };
    			}

    			button2.$set(button2_changes);

    			if (!current || dirty & /*videoUrl*/ 2 && !src_url_equal(video.src, video_src_value = /*videoUrl*/ ctx[1])) {
    				attr_dev(video, "src", video_src_value);
    			}

    			if (!current || dirty & /*width*/ 4) {
    				set_style(main, "width", /*width*/ ctx[2] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(logo.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(vimeo.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(logo.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(vimeo.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(logo);
    			destroy_component(button0);
    			destroy_component(vimeo);
    			destroy_component(button1);
    			destroy_component(button2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getVideoUrl() {
    	const orientation = window.innerHeight > window.innerWidth
    	? "portrait"
    	: "landscape";

    	return `./assets/video/bg_${orientation}.mp4`;
    }

    function onClickPortfolio() {
    	var _a;

    	(_a = document.getElementById("portfolio")) === null || _a === void 0
    	? void 0
    	: _a.scrollIntoView({ behavior: "smooth" });
    }

    function instance($$self, $$props, $$invalidate) {
    	let innerWidth;
    	let width;
    	let videoUrl;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let quote = "Ik wil de wereld van haar mooiste kant laten zien. Dit doe ik via mijn passie voor film.";
    	onMount(onResize);

    	function onResize() {
    		const newVideoUrl = getVideoUrl();
    		if (newVideoUrl == videoUrl) return;
    		$$invalidate(1, videoUrl = newVideoUrl);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function onwindowresize() {
    		$$invalidate(0, innerWidth = window_1.innerWidth);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		Button,
    		Logo,
    		Vimeo,
    		quote,
    		onResize,
    		getVideoUrl,
    		onClickPortfolio,
    		videoUrl,
    		innerWidth,
    		width
    	});

    	$$self.$inject_state = $$props => {
    		if ('quote' in $$props) $$invalidate(3, quote = $$props.quote);
    		if ('videoUrl' in $$props) $$invalidate(1, videoUrl = $$props.videoUrl);
    		if ('innerWidth' in $$props) $$invalidate(0, innerWidth = $$props.innerWidth);
    		if ('width' in $$props) $$invalidate(2, width = $$props.width);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*innerWidth*/ 1) {
    			$$invalidate(2, width = Math.min(Math.max(screen.width, screen.height) * 0.5, Math.max(innerWidth, 300)));
    		}
    	};

    	$$invalidate(0, innerWidth = 0);
    	$$invalidate(1, videoUrl = getVideoUrl());
    	return [innerWidth, videoUrl, width, quote, onResize, onwindowresize];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
