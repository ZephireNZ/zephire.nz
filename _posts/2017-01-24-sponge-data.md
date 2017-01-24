---
layout: post
title: "Custom Data in Sponge"
---

Sponge has a powerful data system, that can do much more than just vanilla features. It's also 
possible to create your own data objects, allowing you to serialize objects directly to 
players, entities and more!

<!--more-->

To start making your own data, we recommend that you read up on each of the components of the ecosystem in the
[data](https://docs.spongepowered.org/master/en/plugin/data/) documentation. You should understand how a fully 
implemented system works before you begin work on your own implementation.

There are three main areas of custom data:

- `DataHolder`s, which store data such as items and entities
- `DataManipulator`s, which are attached to a `DataHolder` and can contain any number of 
  serializable objects. Manipulators will stay attached to their owner, even across reboots
- `DataSerializable`s, which can be saved/loaded into configs, files, or world files

We will provide and explain snippets of code throughout the tutorials, however we also provide a 
[full implementation](https://github.com/SpongePowered/Cookbook/tree/master/Plugin/MyHomes) for those that prefer 
to look through an example implementation.

TODO: Table of Contents

## DataManipulators ##

The core part of custom data is the `DataManipulator`. To implement it, you must first decide if you want to 
create a separate API for your custom data. Generally speaking it's best to separate the API from the implementation 
(as SpongeAPI does), but if it won't be seen by other developers then you can just put both in the same class.

You'll want to define an API method for each "unit" your data, such as a `String`, `int`, `ItemStack` or 
a custom type like `Home`. These units will be wrapped in a `Value`, which will allow it to be accessed
with `Key`s. There are various extensions of `Value` depending on which object will be represented, such
as `MapValue` which provides the standard map operations, or `BoundedComparableValue` which can set
limits on the upper and lower bound of an `Comparable` objects like integers.

Now, pick which of the `AbstractData` types you'll extend from. While you could implement from scratch, these
abstract types remove a *lot* of the work that needs to be done implementing the required methods. A full list can be 
found in `org.spongepowered.api.data.manipulator.mutable.common`. See either :ref:`single-data-types` or 
:ref:`compound-data-types` below for implementation details each type.

You need to create two different classes - one which is mutable and implements `DataManipulator` and your
abstract type, and an immutable version which implements `ImmutableDataManipulator` and your *immutable* 
abstract type.

{% include alert.html type="info" title="Note" content="<b>All</b> data must have mutable and immutable versions, you must implement both." %}

For all types, you'll need to define the `DataManipulator#asImmutable()`/
`ImmutableDataManipulator#asMutable() {asMutable()}` methods - this is as simple as copying the existing
objects into a constructor for the alternate version.

### Values ###

Your value getter(s) need to return a value. In the example below, we get the `ValueFactory`. This saves us a
lot of type by using Sponge's already implemented `Value` objects. Depending on what value you're creating there a
different methods to call such as `createMapValue`, `createBoundedComparableValue`, etc.

**Code Example: Implementing a Value Getter**

```java
import org.spongepowered.api.Sponge;
import org.spongepowered.api.data.value.ValueFactory;
import org.spongepowered.api.data.value.mutable.Value;

import org.spongepowered.cookbook.myhomes.data.home.Home;
import org.spongepowered.cookbook.myhomes.data.Keys;

@Override
protected Value<Home> defaultHome() {
    return Sponge.getRegistry().getValueFactory()
            .createValue(Keys.DEFAULT_HOME, getValue(), null);
}
```

Note that an `ImmutableDataManipulator` would instead return an `ImmutableValue`, by calling `asImmutable()` on
the returned `Value`. We recommended that you cache this (such as with a class field) in the immutable version.

Each `Value` also needs a `Key` to identify it, seen in the example as `Keys.DEFAULT_HOME`. Similar
to values, you use one of the `makeXKey()` methods in `KeyFactory` to create a `Key` for your value.

You need to pass one `TypeToken` representing the *raw* type of your value, and one `TypeToken` representing the
`Value`. You also need to provide a `DataQuery` path - this is most commonly used to serialize the
`Value`. As with any catalog type you must also provide a unique ID and a name. Put this all together and you have a
`Key` you can use in your `Value` s.

**Code Example: Creating a Key**

```java
import org.spongepowered.api.data.DataQuery;
import org.spongepowered.api.data.key.Key;
import org.spongepowered.api.data.key.KeyFactory;
import org.spongepowered.api.data.value.mutable.Value;
import org.spongepowered.api.data.value.mutable.Value;

import com.google.common.reflect.TypeToken;

import org.spongepowered.cookbook.myhomes.data.home.Home;

public static final Key<Value<Home>> DEFAULT_HOME = KeyFactory.makeSingleKey(
        TypeToken.of(Home.class),
        new TypeToken<Value<Home>>() {},
        DataQuery.of("DefaultHome"), "myhomes:default_home", "Default Home");
```


{% capture tokens_content %}
`TypeToken`s are used by the server implementation to preserve the generic type of your
values. They are created in one of two ways:
- For non-generic types, use `TypeToken.of(MyType.class)`
- For generic types, create an anonymous class with `TypeToken<MyGenericType<String>>() {}`
{% endcapture %}
{% capture tokens_content %}{{ tokens_content | markdownify }}{% endcapture %}

{% include alert.html type="info" title="Note" content=tokens_content %}

    

### Serialization ###

To make your data serializable to `DataHolder`s or config files, you must also
implement `DataSerializable#toContainer()`. We recommend calling `super.toContainer()` as this will
include the version from `DataSerializable#getContentVersion()`. You should increase the version each time a
change is made to the format of your serialized data, and use :ref:`content-updaters` to allow backwards compatability.

.. note::

    

{% include alert.html type="info" title="Note" content="This is not required for simple single types, as the already implement <code>toContainer()</code>" %}

**Code Example: Implementing toContainer**

```java 
import org.spongepowered.api.data.DataContainer;

import org.spongepowered.cookbook.myhomes.data.Keys;

@Override
public DataContainer toContainer() {
    DataContainer container = super.toContainer();
    // This is the simplest, but use whatever structure you want!
    container.set(Keys.DEFAULT_HOME.getQuery(), this.defaultHome);
    container.set(Keys.HOMES, this.homes);

    return container;
}
```

### Single Types ###

Single types require little implementation because much of the work has already been done in the `AbstractSingleData`
type you extend from. 

The "simple" abstract types are the easiest to implement, but are restricted to only the types below:

- `Boolean`
- `Comparable`
- `Integer`
- `List`
- `Map`
- `CatalogType`
- `Enum`

For all other types you must implement a custom single type by extending `AbstractSingleData`. This allows you to 
define your own single data with whatever type you want, while still doing most of the work for you.

.. tip::

    The abstract implementations save the object for you in the constructor. You can access it in your implementation 
    by calling the `getValue()` and `getValueGetter()` methods.

#### Simple Single Types ####

Almost all the work is done for you with simple abstract types. All you need to do is:

- Extend the relevant abstract type
- pass the `Key` for your data, the object itself, and the default object (if the object is null) in the constructor

`AbstractBoundedComparableData` (and the immutable equivalent) additionally require minimum and maximum 
values that will be checked, as well as a `Comparator`.

.. note::

    `List` and `Mapped` single types must instead implement `ListData` / `MappedData` (or the immutable 
    equivalent). This adds additional methods to allow Map-like/List-like behavior directly on the `DataManipulator`.

The following 3 methods must be defined on mutable manipluators:

`fill(DataHolder, MergeFunction)` should replace the data on your object with that of the given `DataHolder`, 
using the result of `MergeFunction#merge()`.

```java
import org.spongepowered.api.data.DataHolder;
import org.spongepowered.api.data.merge.MergeFunction;

import org.spongepowered.cookbook.myhomes.data.friends.FriendsData;

import java.util.Optional;

@Override
public Optional<FriendsData> fill(DataHolder dataHolder, MergeFunction overlap) {
    FriendsData merged = overlap.merge(this, dataHolder.get(FriendsData.class).orElse(null));
    setValue(merged.friends().get());

    return Optional.of(this);
}
```

`from(DataContainer)` should overwrite its value with the one in the container and return itself, otherwise return
`Optional.empty()`

```java
import org.spongepowered.api.data.DataContainer;
import org.spongepowered.api.data.DataQuery;

import org.spongepowered.cookbook.myhomes.data.Keys;
import org.spongepowered.cookbook.myhomes.data.friends.FriendsData;
import org.spongepowered.cookbook.myhomes.data.friends.ImmutableFriendsData;

import com.google.common.collect.Maps;

import java.util.Optional;
import java.util.UUID;

@Override
public Optional<FriendsData> from(DataContainer container) {
    if(container.contains(Keys.FRIENDS)) {
        List<UUID> friends = container.getObjectList(Keys.FRIENDS.getQuery(), UUID.class).get();
        return Optional.of(setValue(friends));
    }

    return Optional.empty();
}
```

`copy()` should, as the name suggests, return a copy of itself with the same data.

```java
import org.spongepowered.cookbook.myhomes.data.friends.FriendsData;

@Override
public FriendsData copy() {
    return new FriendsDataImpl(getValue());
}
```

#### Custom Single Types ####

In addition to the , you need to override the following methods:

`getValueGetter()` should pass the `Value` representing your data (see above).

`toContainer()` should return a `DataContainer` representing your data (see above).

### Compound Types ###

Whereas single types only support one value, "compound" types support however many values you want. This is useful 
when multiple objects are grouped, such as `FurnaceData`. The downside, however, is that they are more 
complex to implement.

To start with, create all the `Value` getters that your data will have. For each value, create a method to get and 
set the *raw* object, which you'll use later. For immutable data, only the getters are necessary.

#### Registering Values ####

Next, you'll want to register these so that the `Key`-based system can reference them. To do this,
implement either `DataManipulator#registerGettersAndSetters()` or 
`ImmutableDataManipulator#registerGetters()` depending on whether the data is mutable or not.

For each value you must call:

- `registerKeyValue(Key, Supplier)` referencing the `Value` getter for the given key
- `registerFieldGetter(Key, Supplier)` referencing the getter method for the *raw* object defined above
- `registerFieldSetter(Key, Consumer)` referencing the setter method above if you are implementing the mutable
  version

We recommend using Java 8's `::` syntax for easy `Supplier` and `Consumer` functions.

**Code Example: Implementing Getters and Setters**

```java
import org.spongepowered.cookbook.myhomes.data.Keys
    
// registerGetters() for immutable implementation
@Override
protected void registerGettersAndSetters() {
    registerKeyValue(Keys.DEFAULT_HOME, this::defaultHome);
    registerKeyValue(Keys.HOMES, this::homes);

    registerFieldGetter(Keys.DEFAULT_HOME, this::getDefaultHome);
    registerFieldGetter(Keys.HOMES, this::getHomes);

    // Only on mutable implementation
    registerFieldSetter(Keys.DEFAULT_HOME, this::setDefaultHome);
    registerFieldSetter(Keys.HOMES, this::setHomes);
}
```

`fill(DataHolder, MergeFunction)` and `from(DataContainer)` are similar to the implementations for single data, 
but loading all your values.

## Serializing Custom Data ##

Without a method serializing and deserializng, your data will not persist across restarts. Sponge has a few different 
ways to serialize/deserialize data based on the type of data:

- `DataSerializable`s implement an interface to perform serialization, and use `DataBuilder` for 
  deserialization and creation
- :doc:`DataManipulators <../datamanipulators>` also implement `DataSerializable`, but instead use a 
  `DataManipulatorBuilder` for deserialization and creation
- Objects that do not or cannot implement `DataSerializable` use `DataTranslator` for both serialization 
  and deserialization

This means that practically any object in Java can be saved to disk if it has been registered!

### Reading DataViews ###

Whenever you're reading a serialized object, it's tempting to read all the individual values yourself in order to 
manually create all the required objects (and their parameters) for your data. However, depending on the data saved in 
the container there are a few ways ways that are far more convenient:

- Common java types such as `int`, `String`, `double`, `List` and `Map` can be retrieved using built-in 
  methods `getInt(DataQuery)`, `getString(DataQuery)`, etc. Lists of these types can also be retrieved in a 
  similar fashion, for example `getStringList(DataQuery)`.
- `DataSerializable` objects can be retrieved using `getSerializable(DataQuery, Class)` or 
  `getSerializableList(DataQuery, Class)`. Along with the path, you must also specify the `Class` of the 
  serializable type, such as `Home.class`.
- Objects with a registered `DataTranslator` can be retrieved using `getObject(DataQuery, Class)` or 
  `getObjectList(DataQuery, Class)`. A full list of classes that are supported by default can be found in 
  `DataTranslators`.

In all cases you need to specify a path using a `DataQuery`. If your data has a corresponding `Key` this is 
as easy as calling `key.getQuery()`.  Otherwise, the easiest way to do this is with `DataQuery.of("name")`.

.. tip::

    DataQueries can be used to reference data multiple nodes down a tree by using, for example, 
    `DataQuery.of("my", "custom", "data")`. 

### DataBuilders ###

To make an object serializable, first ensure that it implements `DataSerializable`. You must implement just 
two methods:

- `getContentVersion()` - this defined the current version of your data. 
- `toContainer()` - this is what your builder will be given when attempting to deserialize and object. You can store 
  whatever you want in the returned `DataContainer`, so long as it is also serializable using one of the methods 
  above. Just use the `set(DataQuery, Object)` method to save your data to the given path. 

.. tip::
    
    It is recommended that you save the version of your data to the container as well using `Queries.CONTENT_VERSION`
    as the query. This will allow for versioning upgrades with :ref:`content-updaters`.

**Code Example: Implementing toContainer**

```java
import org.spongepowered.api.data.DataContainer;
import org.spongepowered.api.data.DataQuery;
import org.spongepowered.api.data.Queries;
import org.spongepowered.api.data.MemoryDataContainer;

    String name = "Spongie";

    @Override
    public DataContainer toContainer() {
        return new MemoryDataContainer()
                .set(DataQuery.of("Name"), this.name)
                .set(Queries.CONTENT_VERSION, getContentVersion());
    }
```

The next part is to implement a `DataBuilder`. It's recommended to extend `AbstractDataBuilder` as 
it will try to upgrade your data if the version is less than the current version. There's only one method you need to 
implement - `build(DataView)`, or `buildContent(DataView)` if you're using `AbstractDataBuilder`.

You'll want to check that all the queries you want to retrieve are present using `DataView.contains(Key...)`. If not 
the data is likely incomplete and you should return `Optional.empty()`.

If everything seems to be there, use the `getX` methods to construct the values and return a newly created object as 
an `Optional`.

Finally, you need to register this builder so that it can be found by plugins. To do this, simply call 
`DataManager#registerDataBuilder(Class, DataBuilder)` referencing the data class and an instance of the builder.

### DataContentUpdaters ###

What happens if you change the layout of data in a new version release? `DataContentUpdater` s solve that 
problem. If the serialized object is less than the current version, an `AbstractDataBuilder` will try and update the 
data before passing it to the builder.

Each updater has an input version and an output version. You should take in the old data and change whatever is needed 
to upgrade it to a newer layout. If it's impossible to convert due to missing data, it may be possible instead to 
provide a default value which is interpreted elsewhere - such as by the main builder or the object itself.

Finally, you must ensure that all `DataContentUpdater`s are registerered with 
`DataManager#registerContentUpdater()` referencing the main data class - this will allow them to be discovered by 
the builder.

**Code Example: Implenting a DataContentUpdater**

```java
    org.spongepowered.api.data.persistence.DataContentUpdater
    org.spongepowered.api.text.Text

    public class NameUpdater implements DataContentUpdater {

        @Override
        public int getInputVersion() {
            return 1;
        }

        @Override
        public int getOutputVersion() {
            return 2;
        }

        @Override
        public DataView update(DataView content) {
            String name = content.getString(DataQuery.of("Name")).get();
            
            // For example, version 2 uses a text for the name
            return content.set(DataQuery.of("Name"), Text.of(name));
        }
    }
```

### DataManipulatorBuilders ###

A `DataManipualatorBuilder` is very similar to `DataBuilder`, however it adds a few methods directly related to 
deserializing manipulators:

- `create()` should return a new manipulator with default values
- `createFrom(DataHolder)` is similar to the build method, but instead the values should be taken from the 
  `DataHolder`. If there is no data to be taken from the holder, just return the output of `create()`. If 
  the data is incompatible with the `DataHolder`, you should instead return `Optional.empty()`.

Just like `DataBuilder`, you should read and return your manipulator in the relevant `build` method.

`DataManipulatorBuilder`s can make use of :ref:`content-updaters` as well, as long as you implement 
`AbstractDataBuilder`.

Registering a `DataManipulatorBuilder` is also similar to `DataBuilder` but uses the `register()` method. You 
must reference both your mutable and immutable classes in the method, in addition to an instance of your builder. 

.. note::

    You **must** reference the implementation classes if you have split the API from the implementaton.

### DataTranslators ###

Often the objects you want to serialize are not objects that implement `DataSerializable`, such as `Vector3d` or 
`Date`. To allow these objects you implelement a `DataTranslator` which handles *both* the serialization 
and deserialization of the object.

The implementation of `translate` is identical to `toContainer()` and `build(DataView)` for a 
`DataSerializable` as shown above, except that an `InvalidDataException` is thrown if data is missing in place of 
returning an `Optional`.

As with other data, ensure that you register the translator with 
`DataManager#registerTranslator(Class, DataTranslator)`.