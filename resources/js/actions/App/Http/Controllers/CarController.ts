import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CarController::index
* @see app/Http/Controllers/CarController.php:10
* @route '/cars'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cars',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CarController::index
* @see app/Http/Controllers/CarController.php:10
* @route '/cars'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CarController::index
* @see app/Http/Controllers/CarController.php:10
* @route '/cars'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CarController::index
* @see app/Http/Controllers/CarController.php:10
* @route '/cars'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CarController::index
* @see app/Http/Controllers/CarController.php:10
* @route '/cars'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CarController::index
* @see app/Http/Controllers/CarController.php:10
* @route '/cars'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CarController::index
* @see app/Http/Controllers/CarController.php:10
* @route '/cars'
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
* @see \App\Http\Controllers\CarController::create
* @see app/Http/Controllers/CarController.php:16
* @route '/cars/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/cars/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CarController::create
* @see app/Http/Controllers/CarController.php:16
* @route '/cars/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CarController::create
* @see app/Http/Controllers/CarController.php:16
* @route '/cars/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CarController::create
* @see app/Http/Controllers/CarController.php:16
* @route '/cars/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CarController::create
* @see app/Http/Controllers/CarController.php:16
* @route '/cars/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CarController::create
* @see app/Http/Controllers/CarController.php:16
* @route '/cars/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CarController::create
* @see app/Http/Controllers/CarController.php:16
* @route '/cars/create'
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
* @see \App\Http\Controllers\CarController::show
* @see app/Http/Controllers/CarController.php:0
* @route '/cars/{car}'
*/
export const show = (args: { car: string | number } | [car: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/cars/{car}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CarController::show
* @see app/Http/Controllers/CarController.php:0
* @route '/cars/{car}'
*/
show.url = (args: { car: string | number } | [car: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { car: args }
    }

    if (Array.isArray(args)) {
        args = {
            car: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        car: args.car,
    }

    return show.definition.url
            .replace('{car}', parsedArgs.car.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CarController::show
* @see app/Http/Controllers/CarController.php:0
* @route '/cars/{car}'
*/
show.get = (args: { car: string | number } | [car: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CarController::show
* @see app/Http/Controllers/CarController.php:0
* @route '/cars/{car}'
*/
show.head = (args: { car: string | number } | [car: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CarController::show
* @see app/Http/Controllers/CarController.php:0
* @route '/cars/{car}'
*/
const showForm = (args: { car: string | number } | [car: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CarController::show
* @see app/Http/Controllers/CarController.php:0
* @route '/cars/{car}'
*/
showForm.get = (args: { car: string | number } | [car: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CarController::show
* @see app/Http/Controllers/CarController.php:0
* @route '/cars/{car}'
*/
showForm.head = (args: { car: string | number } | [car: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\CarController::store
* @see app/Http/Controllers/CarController.php:21
* @route '/cars'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cars',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CarController::store
* @see app/Http/Controllers/CarController.php:21
* @route '/cars'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CarController::store
* @see app/Http/Controllers/CarController.php:21
* @route '/cars'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CarController::store
* @see app/Http/Controllers/CarController.php:21
* @route '/cars'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CarController::store
* @see app/Http/Controllers/CarController.php:21
* @route '/cars'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CarController::destroy
* @see app/Http/Controllers/CarController.php:42
* @route '/cars/{car}'
*/
export const destroy = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cars/{car}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CarController::destroy
* @see app/Http/Controllers/CarController.php:42
* @route '/cars/{car}'
*/
destroy.url = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { car: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { car: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            car: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        car: typeof args.car === 'object'
        ? args.car.id
        : args.car,
    }

    return destroy.definition.url
            .replace('{car}', parsedArgs.car.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CarController::destroy
* @see app/Http/Controllers/CarController.php:42
* @route '/cars/{car}'
*/
destroy.delete = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CarController::destroy
* @see app/Http/Controllers/CarController.php:42
* @route '/cars/{car}'
*/
const destroyForm = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CarController::destroy
* @see app/Http/Controllers/CarController.php:42
* @route '/cars/{car}'
*/
destroyForm.delete = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\CarController::toggleStatus
* @see app/Http/Controllers/CarController.php:48
* @route '/cars/{car}/toggle-status'
*/
export const toggleStatus = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggleStatus.url(args, options),
    method: 'put',
})

toggleStatus.definition = {
    methods: ["put"],
    url: '/cars/{car}/toggle-status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CarController::toggleStatus
* @see app/Http/Controllers/CarController.php:48
* @route '/cars/{car}/toggle-status'
*/
toggleStatus.url = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { car: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { car: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            car: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        car: typeof args.car === 'object'
        ? args.car.id
        : args.car,
    }

    return toggleStatus.definition.url
            .replace('{car}', parsedArgs.car.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CarController::toggleStatus
* @see app/Http/Controllers/CarController.php:48
* @route '/cars/{car}/toggle-status'
*/
toggleStatus.put = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggleStatus.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CarController::toggleStatus
* @see app/Http/Controllers/CarController.php:48
* @route '/cars/{car}/toggle-status'
*/
const toggleStatusForm = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CarController::toggleStatus
* @see app/Http/Controllers/CarController.php:48
* @route '/cars/{car}/toggle-status'
*/
toggleStatusForm.put = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

toggleStatus.form = toggleStatusForm

const CarController = { index, create, show, store, destroy, toggleStatus }

export default CarController