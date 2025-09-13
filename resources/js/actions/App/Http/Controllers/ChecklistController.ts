import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ChecklistController::index
* @see app/Http/Controllers/ChecklistController.php:13
* @route '/checklists'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/checklists',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChecklistController::index
* @see app/Http/Controllers/ChecklistController.php:13
* @route '/checklists'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChecklistController::index
* @see app/Http/Controllers/ChecklistController.php:13
* @route '/checklists'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChecklistController::index
* @see app/Http/Controllers/ChecklistController.php:13
* @route '/checklists'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChecklistController::index
* @see app/Http/Controllers/ChecklistController.php:13
* @route '/checklists'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChecklistController::index
* @see app/Http/Controllers/ChecklistController.php:13
* @route '/checklists'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChecklistController::index
* @see app/Http/Controllers/ChecklistController.php:13
* @route '/checklists'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\ChecklistController::create
* @see app/Http/Controllers/ChecklistController.php:19
* @route '/checklists/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/checklists/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChecklistController::create
* @see app/Http/Controllers/ChecklistController.php:19
* @route '/checklists/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChecklistController::create
* @see app/Http/Controllers/ChecklistController.php:19
* @route '/checklists/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChecklistController::create
* @see app/Http/Controllers/ChecklistController.php:19
* @route '/checklists/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChecklistController::create
* @see app/Http/Controllers/ChecklistController.php:19
* @route '/checklists/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChecklistController::create
* @see app/Http/Controllers/ChecklistController.php:19
* @route '/checklists/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChecklistController::create
* @see app/Http/Controllers/ChecklistController.php:19
* @route '/checklists/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\ChecklistController::store
* @see app/Http/Controllers/ChecklistController.php:27
* @route '/checklists'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/checklists',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChecklistController::store
* @see app/Http/Controllers/ChecklistController.php:27
* @route '/checklists'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChecklistController::store
* @see app/Http/Controllers/ChecklistController.php:27
* @route '/checklists'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChecklistController::store
* @see app/Http/Controllers/ChecklistController.php:27
* @route '/checklists'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChecklistController::store
* @see app/Http/Controllers/ChecklistController.php:27
* @route '/checklists'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ChecklistController::destroy
* @see app/Http/Controllers/ChecklistController.php:68
* @route '/checklists/{checklist}'
*/
export const destroy = (args: { checklist: number | { id: number } } | [checklist: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/checklists/{checklist}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ChecklistController::destroy
* @see app/Http/Controllers/ChecklistController.php:68
* @route '/checklists/{checklist}'
*/
destroy.url = (args: { checklist: number | { id: number } } | [checklist: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { checklist: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { checklist: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            checklist: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        checklist: typeof args.checklist === 'object'
        ? args.checklist.id
        : args.checklist,
    }

    return destroy.definition.url
            .replace('{checklist}', parsedArgs.checklist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChecklistController::destroy
* @see app/Http/Controllers/ChecklistController.php:68
* @route '/checklists/{checklist}'
*/
destroy.delete = (args: { checklist: number | { id: number } } | [checklist: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ChecklistController::destroy
* @see app/Http/Controllers/ChecklistController.php:68
* @route '/checklists/{checklist}'
*/
const destroyForm = (args: { checklist: number | { id: number } } | [checklist: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChecklistController::destroy
* @see app/Http/Controllers/ChecklistController.php:68
* @route '/checklists/{checklist}'
*/
destroyForm.delete = (args: { checklist: number | { id: number } } | [checklist: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ChecklistController = { index, create, store, destroy }

export default ChecklistController